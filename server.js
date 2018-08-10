const unirest = require('unirest');
const Url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=";
let initialVal = $("#filter").val();
let val = initialVal.replace(/\s/g, /%20/g);

unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=lentils%2C+spinach&number=5&ranking=1")
		//.get(Url + val)
	.header("X-Mashape-Key", "oR8bWvbrFnmshE43GmhkL28ZMzxgp15eQqFjsnk5Ni6MpoVT5y")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
	console.log(result.status, result.headers, result.body);
});


