const recipes = [];

// Get all recipes
function getAllRecipes() {
  return recipes;
}

// Add a new recipe
function addRecipe(recipe) {
  recipes.push(recipe);
}

// Optionally, get a recipe by title or id
function getRecipe(title) {
  return recipes.find(r => r.title === title);
}

module.exports = {
  getAllRecipes,
  addRecipe,
  getRecipe
};