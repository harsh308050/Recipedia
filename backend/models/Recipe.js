const mongoose = require('mongoose');

// Define the Recipe schema
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },  // Recipe title
    ingredients: { type: [String], required: true },  // Ingredients array
    instructions: { type: String, required: true },  // Cooking instructions
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User who created the recipe
    image: { type: String },  // Optional image URL
    prepTime: { type: Number },  // Optional preparation time in minutes
    cookTime: { type: Number },  // Optional cooking time in minutes
    servings: { type: Number },  // Optional servings count
    tags: [String],  // Optional tags array
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
