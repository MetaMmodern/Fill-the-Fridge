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
    recipeIngredients: Array[string],
    page: number
  ): Promise<Array<RecipeBaseDetails>>;
  getRecipeDetails(recipeId: string): Promise<RecipeFullDetails>;
  getRecipeCartPrices(whatToBuy: string[]): Promise<RecipeCartPrices>;
  createNewUser(email: string, password: string): Promise<void>;
  updateUserPassword?: () => Promise<void>;
  deleteUser?: () => Promise<void>;
  createNewRecipe?: (recipeDetails: {
    image: string;
    description: string;
  }) => Promise<string>;
  getRecipeComments?: () => Promise<string[]>;
  postNewComment?: (
    recipeId: string,
    comment: string,
    user: string
  ) => Promise<void>;
}
export default baseAPI;
