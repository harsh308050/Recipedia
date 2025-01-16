const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    profilePicture: { type: String },  // Optional profile picture URL
}, { timestamps: true });

// Password hashing before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Skip if password isn't modified
    this.password = await bcrypt.hash(this.password, 12);  // Hash the password with bcrypt
    next();
});

// Compare input password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('users', UserSchema);
