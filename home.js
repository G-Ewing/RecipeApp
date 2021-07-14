const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "fd236e1a";
const APP_KEY = "4bd031494c342c35ac0dba4873985818";
const baseURL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
  });
  
  async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
    const response = await fetch(baseURL);
    const data = await response.json();
    //generateHTML(data.hits) is going to pass the data to the funcition
    generateHTML(data.hits);
    console.log(data);
  }
//generateHTML uses the results of the search to generate recipe cards
  function generateHTML(results){
      let generatedHTML = "";
      results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <button>
                <a href="${result.recipe.url}">View Recipe</a>
                </button>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}
            <br>
            Cultural Origin: ${result.recipe.cuisineType}
            <br>
            Meal Type: ${result.recipe.mealType}
            </p>
        </div>
        `
      })
      searchResultDiv.innerHTML = generatedHTML;
  }