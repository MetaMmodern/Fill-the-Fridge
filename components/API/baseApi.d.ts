import { CommentsResponse, SingleCommentResponse } from "../../types";

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
  createNewRecipe: (recipeDetails: FormData) => Promise<string>;
  getRecipeComments?: (recipeId: string) => Promise<CommentsResponse>;
  postNewComment?: (
    recipeId: string,
    comment: string,
    user: string
  ) => Promise<void>;
}
export default baseAPI;
