import baseAPI, { RecipeBaseDetails } from "./baseApi";

const API: baseAPI = {
  getRecipes: async function (recipeIngredients) {
    if (recipeIngredients && recipeIngredients.length) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ings: recipeIngredients }),
      };

      const response = await fetch(`api/recipes/search/`, options);
      const recipes: { recipesArray: RecipeBaseDetails[] } =
        await response.json();
      console.debug(recipes);
      return recipes.recipesArray;
    }
    return Promise.resolve([]);
  },
  getRecipeDetails: async function (recipeId) {
    const req = await fetch(`/api/recipes/${recipeId}`);
    const json = await req.json();
    return json;
  },
  // TODO: add all missing methods
  getRecipeCartPrices: async function (whatToBuy) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json; Charset=utf-8" },
      body: JSON.stringify({
        whatToBuy,
      }),
    });

    const stores = await response.json();
    return stores;
  },
};
export default API;
