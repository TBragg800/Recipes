var newData;
recipesBtn = document.querySelector(".recipesBtn");
specialsBtn = document.querySelector(".specialsBtn");
postBtn = document.querySelector(".postBtn");
submitBtn = document.getElementById("submit");
inputs = document.querySelectorAll("input");
textareas = document.querySelectorAll("textarea");
recipeDiv = document.querySelector(".recipe-div");
specialsDiv = document.querySelector(".specials-div");

recipesBtn.addEventListener("click", (e) => {showRecipes();showDiv(e)});
specialsBtn.addEventListener("click", (e) => {getSpecials();showDiv(e);});
postBtn.addEventListener("click", (e) => {showDiv(e);getValues();});
inputs.forEach(input => input.addEventListener("keydown", getValues));
textareas.forEach(input => input.addEventListener("keydown", getValues));
submitBtn.addEventListener('click', newRecipe);

$(document).ready(function () {
  console.log("Thank you for giving me an opportunity to be in front of you. Your consideration means a lot and I'm exicted to hear learn from you. \nBest, \nThomas Bragg");
});

function showDiv(e) {
  $(".containers").addClass("animOffScreen");
  setTimeout(() => {
    $(".containers").addClass("d-none");
    $(".containers").removeClass("animOffScreen");
    e.target === recipesBtn ? $(".recipes-container").removeClass("d-none")
      : e.target === specialsBtn ? $(".specials-container").removeClass("d-none animOffScreen")
        : $(".new-recipes-container").removeClass("d-none animOffScreen") }, 500);
}

function showRecipes() {
  Promise.all([
    fetch('http://localhost:3001/recipes'),
    fetch('http://localhost:3001/specials')
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    recipes = data[0];
    specials = data[1];
    let specialIngredientIds = specials.map((s) => { return s.ingredientId });
    recipeDiv.innerHTML = recipes.map(function (recipe) {
      if (recipe.images) {
        image = recipe.images.small
      } else {
        image = "/img/pancake_mountain--s.jpg";
      }
      let ingredientContent = recipe.ingredients.map(function (ingredient) {
        let ingredientLineItems = `<li class="list-group-item" data-key="${ingredient.uuid}">${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</li>`
        if (specialIngredientIds.indexOf(ingredient.uuid) > -1) {
          let special = specials.find(s => { return s.ingredientId === ingredient.uuid })
          ingredientLineItems += `<li class="list-group-item">Special: *<span>${special.title} - ${special.type} - ${special.text}</span>*</li>`
        }
        return ingredientLineItems
      }).join("\n")

      let directionContent = recipe.directions.map(function (direction) {
        return `<li class="list-group-item">${direction.instructions}</li>`
      }).join("\n")

      return `<div class="card-header recipeCardHeader recipe" data="${recipe.title}">
                  <h2 class="card-title">${recipe.title}</h2>
                  <img class="card-title" src="http://localhost:3001/${image}" >
                  <h2 class="card-title">Servings: ${recipe.servings}</h2>
              </div>
              <div class="card-body">
                  <ul class="recipe-ul">Ingredients:
                      ${ingredientContent}
                  </ul>
                  <ulclass="recipe-ul">Directions:
                      ${directionContent}
                  </ul>
                  <ul class="recipe-ul text-center"><span>Prep Time: </span>${recipe.prepTime}&nbsp&nbsp&nbsp&nbsp<span>CookTime: </span>${recipe.cookTime}</ul>
              </div>`
    }).join("&nbsp")
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
      specialsDiv.innerHTML = data.map(function (special) {
        return `<div class="special card-header recipeCardHeader" data="${special.title}">
                  <h2 class="card-title">${special.title}</h2>
                  <div class="card-body">
                    <h3>Type: ${special.type}</h2>
                    <p>Details: ${special.text}</p>
                  </div>
                </div>`
      }).join("&nbsp")
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
  var ingredients = [];
  $('#ingredients').val().split(", ").map(function (i) {
    ingredients.push({ "name": i });
  });
  var directions = $("#directions").val();
  newData = {
    title: recipeName,
    description: description,
    servings: servingSize,
    prepTime: prepTime,
    cookTime: cookTime,
    postDate: Date,
    editDate: Date,
    ingredients: ingredients,
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
  $.post({
    url: "http://localhost:3001/recipes",
    data: JSON.stringify(newData),
    dataType: "json",
    contentType: "application/json",
    success: success
  });
}

function success() {
  $(".success").removeClass("d-none")
  $(".success").addClass("animSuccess");
  setTimeout(() => {
    $(".success").addClass("d-none");
    $(".success").removeClass("animSuccess")
  }, 2000);
}