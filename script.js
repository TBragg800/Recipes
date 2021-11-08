var newData;
recipesBtn = document.querySelector(".recipesBtn");
specialsBtn = document.querySelector(".specialsBtn");
postBtn = document.querySelector(".postBtn");
inputs = document.querySelectorAll("input");
textareas = document.querySelectorAll("textarea");
submitBtn = document.getElementById("submit");
recipeDiv = document.querySelector(".recipe-div");
specialsDiv = document.querySelector(".specials-div");

recipesBtn.addEventListener("click", getRecipes);
specialsBtn.addEventListener("click", getSpecials);
postBtn.addEventListener("click", newRecipe);
inputs.forEach(input => input.addEventListener("keydown", getValues));
textareas.forEach(input => input.addEventListener("keydown", getValues));
submitBtn.addEventListener('click', newRecipe);

function getRecipes() {
  fetch("http://localhost:3001/recipes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      recipeDiv.innerHTML = data.map(function (recipe) {
        // return`<div class="recipe" data="${recipe.title}">
        //   <img src="http://localhost:3001/${recipe.images.small}" >
        //   <h2>${recipe.title}</h2>
        //   <h2>Servings: ${recipe.servings}</h2>
        //   <div>Ingredients:
        //   ${recipe.ingredients.map(function (ingredient) {
        //   return `<p>${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</p>`
        // })}
        //   </div>
        // </div>`
        return `< div class="card employee-card" >
                  <div class="card-header myHeader recipe" data="${recipe.title}">
                      <h2 class="card-title">${recipe.title}</h2>
                      <h2 class="card-title">Servings: ${recipe.servings}</h2>
                      <img class="card-title" src="http://localhost:3001/${recipe.images.small}" >
                  </div>
                  <div class="card-body">
                      <ul class="list-group">Ingredients:
                          ${recipe.ingredients.map(function (ingredient) {
                            return `<li class="list-group-item">${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</li>`
                          })}
                      </ul>
                      <ul class="list-group">Ingredients:
                          ${recipe.directions.map(function (direction) {
                            return `<li class="list-group-item">${direction.instructions}</li>`
                          })}
                      </ul>
                  </div>
                </div >`
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })
};

function getSpecials() {
  fetch("http://localhost:3001/specials")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      specialsDiv.innerHTML = data.map(function (special) {
        return `<div class="special" data="${special.title}">
          <h2>${special.title}</h2>
          <h3>Type: ${special.type}</h2>
          <p>Details: ${special.text}</p>
        </div>`
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })
};

function getValues() {
  var recipeName = $("#recipe-name").val();
  var description = $("#description").val();
  var servingSize = $("#serving-size").val();
  var prepTime = $("#prep-time").val();
  var cookTime = $("#cook-time").val();
  var ingredients = $("#ingredients").val().split(", ");
  for (var i = 0; i < ingredients.length; i++) {
    ingredients[i] = {"ingredient": ingredients[i]}
  }
  var directions = $("#directions").val();
  newData = {
    title: recipeName,
    description: description,
    servings: servingSize,
    prepTime: prepTime,
    cookTime: cookTime,
    postDate: Date,
    editDate: Date,
    ingredients,
    directions: [
      {
        instructions: directions
      }
    ]
  };
  return newData;
}


function newRecipe(e) {
  e.preventDefault();
  getValues()
  $.ajax({
    type: "POST",
    url: "http://localhost:3001/recipes",
    data: newData,
    success: success,
    dataType: "json"
  });
}

function success() {
  console.log("success");
}