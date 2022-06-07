export type RecipeDetails = {
  name: string;
  image: string;
  ingredients: { item: string; amount: string }[];
  link: string;
  recipe: string;
};

export interface ListOfAllGood {
  name: string;
  price: number;
}

export interface Cart {
  name: string;
  price: number;
  count: number;
  products: string[];
  listOfAllGoods: ListOfAllGood[];
  shoppingList: string[];
}

export type Carts = Cart[];

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
export interface NewUserRequestDetails {
  email: string;
  password: string;
  passwordSubmit: string;
}
