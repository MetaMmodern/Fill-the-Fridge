import {
  CommentsResponse,
  RecipeBaseDetails,
  SingleCommentResponse,
} from "../../types";
import baseAPI from "./baseApi";

const server = process.env.NODE_ENV == "development" ? "http://localhost:3000" : process.env.VERCEL_URL;

const API: baseAPI = {
  getRecipes: async function (recipeIngredients) {
    if (recipeIngredients && recipeIngredients.length) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ings: recipeIngredients }),
      };
      const url = new URL("/api/recipes/search", server).href;

      const response = await fetch(url, options);
      const recipes: { recipesArray: RecipeBaseDetails[] } =
        await response.json();
      return recipes.recipesArray;
    }
    return Promise.resolve([]);
  },
  getRecipeDetails: async function (recipeId) {
    const url = new URL(`/api/recipes/${recipeId}`, server).href;
    const req = await fetch(url);
    const json = await req.json();
    return json;
  },
  // TODO: add all missing methods
  getRecipeCartPrices: async function (whatToBuy) {
    const url = new URL("/api/cart", server).href;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; Charset=utf-8" },
      body: JSON.stringify({
        whatToBuy,
      }),
    });

    const stores = await response.json();
    return stores;
  },
  createNewUser: async function ({
    email,
    password,
    passwordSubmit,
  }): Promise<void> {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, passwordSubmit }),
    });
    if (response.status != 201) {
      return;
    }
    return;
  },
  async createNewRecipe(recipeDetails) {
    const res = await fetch("/api/recipes", {
      method: "POST",
      body: recipeDetails,
    });
    const resultId: { id: string } = await res.json();
    return resultId.id;
  },
  async postNewComment(recipeId, comment, user) {
    await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ recipeId, comment, user }),
    });
  },
  async getRecipeComments(recipeId: string) {
    const url = new URL("api/comments", window.location.origin);
    url.searchParams.set("recipeId", recipeId);
    const response = await fetch(url.href);
    const json: CommentsResponse = await response.json();
    return json;
  },
};
export default API;
