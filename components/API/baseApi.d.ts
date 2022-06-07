interface baseAPI {
  getRecipes(
    recipeIngredients: Array[string],
    page: number
  ): Promise<Array<RecipeBaseDetails>>;
  getRecipeDetails(recipeId: string): Promise<RecipeFullDetails>;
  getRecipeCartPrices(whatToBuy: string[]): Promise<RecipeCartPrices>;
  createNewUser(details: NewUserRequestDetails): Promise<void>;
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
