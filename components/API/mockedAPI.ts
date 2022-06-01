import baseAPI from "./baseApi";
import { faker } from "@faker-js/faker";
const API: baseAPI = {
  getRecipes: function (recipeIngredients) {
    const recipes = new Array(Number(faker.random.numeric(2)))
      .fill(0)
      .map(() => {
        const ingrFast = new Array(Number(faker.random.numeric(1)))
          .fill(0)
          .map(() => faker.word.noun());
        return {
          image: faker.image.food(undefined, undefined, true),
          ingrFast,
          link: "/recipe/" + faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          id: faker.database.mongodbObjectId(),
        };
      });
    return Promise.resolve(recipes);
  },
  getRecipeDetails: function (recipeId) {
    const ingredients = new Array(Number(faker.random.numeric(1)))
      .fill(0)
      .map(() => ({
        item: faker.word.noun(),
        amount: faker.random.numeric(2),
      }));
    const recipe = faker.lorem.sentences(Number(faker.random.numeric(2)), " ");
    const link = "/recipe/" + faker.database.mongodbObjectId();
    return Promise.resolve({
      name: faker.name.firstName(),
      image: faker.image.food(),
      ingredients,
      link,
      recipe,
    });
  },
  getRecipeCartPrices: function (recipeId) {
    throw new Error("Function not implemented.");
  },
  createNewUser: function (email: string, password: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
};

const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
const randomDelayAPIHandler: ProxyHandler<typeof API> = {
  async get(target, prop, reciever) {
    const sleepMs = Math.ceil(Math.random() * 100);
    await sleep(sleepMs);
    type propType = keyof typeof target;
    // this is wrong
    return target[prop as keyof typeof target];
  },
};

const randomDelayAPI = new Proxy(API, randomDelayAPIHandler);

export default API;
