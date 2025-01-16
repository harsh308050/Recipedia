const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Save a recipe by its name
router.post('/save-recipe', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { title, ingredients, instructions, image } = req.body;

    if (!title) return res.status(400).json({ message: 'Recipe title is required' });

    let recipe = await Recipe.findOne({ title });

    if (!recipe) {
      recipe = new Recipe({
        title,
        ingredients,
        instructions,
        author: req.user._id,
        image,
      });
      await recipe.save();
    }

    if (!user.savedRecipes.includes(recipe._id)) {
      user.savedRecipes.push(recipe._id);
      await user.save();
    }

    res.json({ message: 'Recipe saved successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe', error: error.message });
  }
});

// Get saved recipes
router.get('/saved-recipes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedRecipes',
      select: '_id title ingredients instructions image',
    });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved recipes', error: error.message });
  }
});

// Fetch a single recipe by ID
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user profile', error: error.message });
  }
});

module.exports = router;
