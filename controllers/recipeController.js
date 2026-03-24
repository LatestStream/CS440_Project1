const { getAllRecipes, addRecipe } = require('../models/recipe');

// Show all recipes (for dashboard page)
function showRecipes(req, res) {
  const recipes = getAllRecipes();
  res.json(recipes); 
}

// Add a new recipe
function createRecipe(req, res) {
  const recipe = {
    title: req.body.title,
    time: req.body.time,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };

  addRecipe(recipe);

  res.json({ message: 'Recipe added', recipe }); // send confirmation
}

module.exports = {
  showRecipes,
  createRecipe
};