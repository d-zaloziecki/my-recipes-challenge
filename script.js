const RecipeApp = function () {
    return {
        recipes: [

        ],

        $recipes: $('.recipes'),

        //id's for recipes
        recId: 2,

        //id's for ingredients
        ingId: 0,

        _getRecipeById: function (recipeId) {
            for (let i = 0; i < this.recipes.length; i++) {
                if (this.recipes[i].id === recipeId) {
                    return this.recipes[i];
                }
            }
        },

        _getIngById: function (recipe, ingredientId) {
            for (let i = 0; i < recipe.ingredients.length; i++) {
                if (recipe.ingredients[i].id === ingredientId) {
                    return recipe.ingredients[i];
                }
            }
        },

        createRecipe: function (name, image) {
            let recipe = {
                name: name,
                image: image,
                ingredients: [],
                id: this.recId
            };

            //keeps recipe ids unique 
            this.recId++;

            this.recipes.push(recipe);
        },

        createIngredients: function (ingridientText, recipeId) {
            let ingridient = {
                text: ingridientText,
                id: this.ingId
            };
            this.ingId++;

            let wantedRecipe = this._getRecipeById(recipeId);
            wantedRecipe.ingredients.push(ingridient);
        },

        removeRecipe: function (recipeId) {
            let recipeToBeRemoved = this._getRecipeById(recipeId);
            this.recipes.splice(this.recipes.indexOf(recipeToBeRemoved), 1);
        },

        removeIng: function (ingridientId, recipeId) {
            let recipe = this._getRecipeById(recipeId);
            let ingridient = this._getIngById(recipe, ingridientId);
            let recipeIngridients = this.recipes[this.recipes.indexOf(recipe)].ingredients;

            recipeIngridients.splice(recipeIngridients.indexOf(ingridient), 1);
        },

        renderRecipes: function () {
            //empty recipes div
            this.$recipes.empty();

            var source = $('#recipe-template').html();
            var template = Handlebars.compile(source);
            var newHTML = template({ allRecipes: this.recipes });

            // append our new html to the page
            this.$recipes.append(newHTML);
        },
    };
};

const app = RecipeApp();


//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function () {
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on("keyup", ".addIngridient", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        let ingridientText = $(this).val();
        let recipeId = $(this).closest('.recipe').data().id;
        app.createIngredients(ingridientText, recipeId);
        app.renderRecipes();
    }
});

$('.recipes').on("click", '.remove-recipe', function () {
    let recipeId = $(this).closest('.recipe').data().id;
    app.removeRecipe(recipeId);
    app.renderRecipes();
})


$('.recipes').on("click", ".removeIng", function () {
    let ingridientId = $(this).closest('.ingridient').data().id;
    let recipeId = $(this).closest('.recipe').data().id;

    app.removeIng(ingridientId, recipeId);
    app.renderRecipes();
})