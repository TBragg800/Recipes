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

// function getRecipes() {
//   fetch("http://localhost:3001/recipes")
//     .then(function (response) {
//       return recipes = response.json();
//     })
//     .then(fetch("http://localhost:3001/specials")
//       .then(function (response) {
//         return specials = response.json();
//       })
//       .then(function (specials) {
//         console.log(specials)
//         return specials;
//       }))
//     .then(function (recipes, specials) {
//       console.log(specials)
//       recipeDiv.innerHTML = recipes.map(function (recipe) {
//         if (recipe.images) {
//           image = recipe.images.small
//         } else {
//           image = "/img/pancake_mountain--s.jpg";
//         }
//         let ingredientContent = recipe.ingredients.map(function (ingredient) {
//           return `<li class="list-group-item">${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</li>`
//         }).join("\n")
        
//         let directionContent = recipe.directions.map(function (direction) {
//             return `<li class="list-group-item">${direction.instructions}</li>`
//         }).join("\n")
  
//         return `
//                 <div class="card-header recipeCardHeader recipe" data="${recipe.title}">
//                     <h2 class="card-title">${recipe.title}</h2>
//                     <img class="card-title" src="http://localhost:3001/${image}" >
//                     <h2 class="card-title">Servings: ${recipe.servings}</h2>
//                 </div>
//                 <div class="card-body">
//                     <ul class="recipe-ul">Ingredients:
//                         ${ingredientContent}
//                     </ul>
//                     <ulclass="recipe-ul">Directions:
//                         ${directionContent}
//                     </ul>
//                     <ul class="recipe-ul text-center">Prep Time:${recipe.prepTime}&nbsp&nbsp&nbsp&nbspCook Time:${recipe.cookTime}</ul>
//                 </div>`
//       })
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     })
// };

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
  var ingredients = [];
  $('#ingredients').val().split(", ").map(function (i) {
    ingredients.push({ "name": i });
  });
  console.log(ingredients)
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

function getRecipes() {
  Promise.all([
    fetch('http://localhost:3001/recipes'),
    fetch('http://localhost:3001/specials')
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    recipes = data[0];
    specials = data[1];
    // console.log(specials[0].ingredientId)
    // if (specials.map(function (special) {
    //   special.ingredientId
    // })
    // &&
    // recipes.map(function (recipe) {
    //   recipe.ingredients.map(function (ingredient) {
    //     ingredient.uuid
    //   })
    // }) === )
    // console.log(recipes[0].ingredients[0].uuid)
    // console.log(recipes[0].ingredients[0].uuid === specials[0].ingredientId)
      recipeDiv.innerHTML = recipes.map(function (recipe) {
        if (recipe.images) {
          image = recipe.images.small
        } else {
          image = "/img/pancake_mountain--s.jpg";
        }

        // for (var i = 0; i < specials.length; i++) {
        //   console.log(specials[i].ingredientId)
        // }

        // for (var i = 0; i < recipe.ingredients.length; i++) {
        //   for (var i = 0; i < specials.length; i++){
            
        //   }
        //   console.log(recipe.ingredients[i].uuid)
        // }
        
        // if (specials.map(function (special) { special.ingredientId }) ===
        //   recipe.ingredients.map(function (ingredient) { ingredient.uuid }) ) {
        //     console.log("working!")
        //   }
        
        
        // recipe.ingredients.map(function (ingredient) {
        //   console.log(ingredient.uuid)
        // })

        let ingredientContent = recipe.ingredients.map(function (ingredient) {
          if (ingredient.uuid === )
          return `<li class="list-group-item" data-key="${ingredient.uuid}">${ingredient.amount} ${ingredient.measurement} - ${ingredient.name}</li>`
        }).join("\n")

        let directionContent = recipe.directions.map(function (direction) {
          return `<li class="list-group-item">${direction.instructions}</li>`
        }).join("\n")

        return `
                <div class="card-header recipeCardHeader recipe" data="${recipe.title}">
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
                    <ul class="recipe-ul text-center">Prep Time:${recipe.prepTime}&nbsp&nbsp&nbsp&nbspCook Time:${recipe.cookTime}</ul>
                </div>`
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })
};