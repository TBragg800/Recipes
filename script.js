var newData;
recipesBtn = document.querySelector(".recipesBtn");
specialsBtn = document.querySelector(".specialsBtn");
postBtn = document.querySelector(".postBtn");
submitBtn = document.getElementById("submit");
inputs = document.querySelectorAll("input");
textareas = document.querySelectorAll("textarea");
recipeDiv = document.querySelector(".recipe-div");
specialsDiv = document.querySelector(".specials-div");

recipesBtn.addEventListener("click", (e) => {getRecipes();showDiv(e)});
specialsBtn.addEventListener("click", (e) => {getSpecials();showDiv(e);});
postBtn.addEventListener("click", (e) => {showDiv(e);getValues();});
inputs.forEach(input => input.addEventListener("keydown", getValues));
textareas.forEach(input => input.addEventListener("keydown", getValues));
submitBtn.addEventListener('click', newRecipe);

function showDiv(e) {
  $(".containers").addClass("animOffScreen");
  setTimeout(() => {
    $(".containers").addClass("d-none");
    $(".containers").removeClass("animOffScreen");
    e.target === recipesBtn ? $(".recipes-container").removeClass("d-none")
      : e.target === specialsBtn ? $(".specials-container").removeClass("d-none animOffScreen")
        : $(".new-recipes-container").removeClass("d-none animOffScreen") }, 500);
}

function getRecipes() {
  fetch("http://localhost:3001/recipes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      recipeDiv.innerHTML = data.map(function (recipe) {
        console.log(recipe)
        if (recipe.images) {
          image = recipe.images.small
        } else {
          image = "/img/pancake_mountain--s.jpg";
        }
        return `
                  <div class="card-header recipeCardHeader recipe" data="${recipe.title}">
                      <h2 class="card-title">${recipe.title}</h2>
                      <img class="card-title" src="http://localhost:3001/${image}" >
                      <h2 class="card-title">Servings: ${recipe.servings}</h2>
                  </div>
                  <div class="card-body">
                      <ul class="recipe-ul">Ingredients:
                          ${recipe.ingredients.map(function (ingredient) {
                            return `<li class="list-group-item">${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</li>`
                          })}
                      </ul>
                      <ulclass="recipe-ul">Directions:
                          ${recipe.directions.map(function (direction) {
                            return `<li class="list-group-item">${direction.instructions}</li>`
                          })}
                      </ul>
                  </div>
                `
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
      specialsDiv.innerHTML = data.map(function (special) {
        return `<div class="special card-header recipeCardHeader" data="${special.title}">
                  <h2 class="card-title">${special.title}</h2>
                  <div class="card-body">
                    <h3>Type: ${special.type}</h2>
                    <p>Details: ${special.text}</p>
                  </div>
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
  var foo = [];
  for (var i = 0; i < ingredients.length; i++) {
    foo[i] = {"name": ingredients[i]}
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
    ingredients: foo,
    directions: [
      {
        instructions: directions
      }
    ]
  };
  return newData;
}

function newRecipe(e) {
  var boo = {
    "title": "Queso Brat Daddy",
    "description": "s breakfast, fit for a crowd.",
    "images": {
      "full": "/img/queso_brat_scramble.jpg",
      "medium": "/img/queso_brat_scramble--m.jpg",
      "small": "/img/queso_brat_scramble--s.jpg"
    },
    "servings": 5,
    "prepTime": 10,
    "cookTime": 20,
    "postDate": "01/20/2018 05:15:03 PM",
    "editDate": "02/05/2018 11:56:29 PM",
    "ingredients": [
      {
        "uuid": "86c9eb8e-3ff6-4d4f-83d7-ea4d9f1ae455",
        "amount": 1,
        "measurement": "cup",
        "name": "pepper jack cheese, shredded"
      }
    ],
    "directions": [
      {
        "instructions": "Serve immediately.",
        "optional": false
      }
    ]
  }
  e.preventDefault();
  getValues()
  $.ajax({
    type: "POST",
    url: "http://localhost:3001/recipes",
    data: boo,
    success: success,
    dataType: "json"
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