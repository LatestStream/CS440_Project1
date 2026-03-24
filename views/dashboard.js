document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-recipe-form");
  const list = document.getElementById("recipe-list");

  // Fetch all recipes when dashboard loads
  fetch("/recipes")
    .then(res => res.json())
    .then(data => {
      data.forEach(recipe => addRecipeToDOM(recipe));
    });

  // Handle form submission
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const recipe = {
      title: document.getElementById("title").value,
      time: document.getElementById("time").value,
      servings: document.getElementById("servings").value,
      ingredients: document.getElementById("ingredients").value,
      instructions: document.getElementById("instructions").value

    };

    fetch("/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe)
    })
    .then(res => res.json())
    .then(data => {
      addRecipeToDOM(recipe);
      form.reset();
    });
  });

  function addRecipeToDOM(recipe) {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
    <h3>${recipe.title}</h3>
    <p><strong>Cooking Time:</strong> ${recipe.time} min</p>
    <p><strong>Servings:</strong> ${recipe.servings}</p>

    <button class="toggle-details-btn">Show Details</button>

    <div class="recipe-details" style="display: none;">
      <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
      <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
    </div>
  `;

  // Add event listener for the button
  const btn = card.querySelector(".toggle-details-btn");
  const details = card.querySelector(".recipe-details");

  btn.addEventListener("click", () => {
    if (details.style.display === "none") {
      details.style.display = "block";
      btn.textContent = "Hide Details";
    } else {
      details.style.display = "none";
      btn.textContent = "Show Details";
    }
  });

    list.appendChild(card);
  }
});