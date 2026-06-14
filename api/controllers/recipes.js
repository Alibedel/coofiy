const Recipe = require('../models/recipe');

async function index(req, res) {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).sort('-createdAt');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch recipes' });
  }
}

async function create(req, res) {
  try {
    const recipe = await Recipe.create({ ...req.body, user: req.user._id });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Could not create recipe', error: err.message });
  }
}

async function show(req, res) {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Invalid recipe id' });
  }
}

async function update(req, res) {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Could not update recipe', error: err.message });
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Could not delete recipe' });
  }
}

module.exports = { create, index, show, delete: deleteRecipe, update };
