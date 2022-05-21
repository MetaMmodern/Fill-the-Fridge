export type RecipeBaseDetails = {
  image: string;
  ingrFast: string[];
  link: string;
  name: string;
  id: string;
};

export type RecipeFullDetails = {
  name: string;
  image: string;
  ingredients: { item: string; amount: string }[];
  link: string;
  recipe: string;
};
export type RecipeCartPrices = {};

interface baseAPI {
  getRecipes(
    recipeIngredients: Array[string]
  ): Promise<Array<RecipeBaseDetails>>;
  getRecipeDetails(recipeId: string): Promise<RecipeFullDetails>;
  getRecipeCartPrices(recipeId: string): Promise<RecipeCartPrices>;
  // getRecipeCommentsById(id: string): void;
}
export default baseAPI;
