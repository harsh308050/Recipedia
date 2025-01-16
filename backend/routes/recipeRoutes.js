const express = require('express');
const { body, validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware for ownership checks
const checkRecipeOwnership = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: `Recipe with ID ${req.params.id} not found` });
    }
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    req.recipe = recipe;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying recipe ownership', error: error.message });
  }
};

// Get all recipes with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const recipes = await Recipe.find()
      .populate('author', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Recipe.countDocuments();
    res.json({ success: true, data: { recipes, total, page: Number(page) } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching recipes', error: error.message });
  }
});

// Get a specific recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching recipe', error: error.message });
  }
});

// Create a new recipe
router.post(
  '/',
  auth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('ingredients').isArray().withMessage('Ingredients must be an array'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const recipe = new Recipe({
        ...req.body,
        author: req.user._id,
      });
      const newRecipe = await recipe.save();
      res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating recipe', error: error.message });
    }
  }
);

module.exports = router;
