import needle from "needle";
import cheerio, { CheerioAPI } from "cheerio";
import creatorurl from "../urlcreate";

type Article = {
  name: string;
  link: string;
  image: string | undefined;
  ingrFast: string[];
  id: string | undefined;
};
function getIngredientsObject(currentHTML: CheerioAPI) {
  const ingredients: {}[] = [];
  currentHTML(".ingredients-bl ul li > span[itemprop='ingredient']").each(
    (_index, value) => {
      const ingredientAndAmount: any = {};
      let inner: any = currentHTML(value)
        .first()
        .contents()
        // .filter(() => {
        //   return this.nodeType === 3;
        // })
        .text()
        .match(/\([^)]*\)/);

      if (inner === null) {
        inner = "";
      } else {
        inner = inner.join();
      }
      ingredientAndAmount.item =
        currentHTML(value).find("span[itemprop='name']").first().text() + inner;
      ingredientAndAmount.amount = currentHTML(value)
        .find("span[itemprop='amount']")
        .text();

      ingredients.push(ingredientAndAmount);
    }
  );
  return ingredients;
}
function newFormat(someText: string) {
  return someText.replace(/\s+/g, " ").trim();
}
export async function getArticle(link: string) {
  const response = await needle("get", link, { follow_max: 3 });
  console.log("needle ok");
  const articleBody = cheerio.load(response.body, {
    decodeEntities: false,
  });
  console.log("cheerio okay");
  return {
    name: articleBody(".item-about div h1").text(),
    link: `http://fillthefridge.me/recipe/${link.split("/").pop()}`,
    image: articleBody(".item-about div .m-img img").attr("src"),
    recipe: newFormat(articleBody(".cooking-bl").text()),
    ingredients: getIngredientsObject(articleBody),
  };
}

export async function articlesFromPage(ings: string[], page: string) {
  try {
    if (ings.length === 0) {
      throw new Error("Empty ingredients array!");
    }
    const options = {
      follow_max: 3,
    };
    const URL = "https://www.povarenok.ru/recipes/search/";
    const readyURL = creatorurl(URL, ings, page);
    const response = await needle("get", readyURL, options);
    if (response.statusCode !== 200) {
      throw new Error(response.statusCode);
    }
    const $ = cheerio.load(response.body);
    const resultsNumber = $("div.sort-res div.bl-right strong").text();
    const nothingFound = "ничего не найдено";
    if (resultsNumber === nothingFound) {
      throw new Error("NO other recieps");
    }
    const articles: Article[] = [];
    $(".item-bl").each((index, item) => {
      const recipeId = $("h2 a", item)
        ?.attr("href")
        ?.replace(/\/$/, "")
        .split("/")
        .pop();
      const article: Article = {
        name: $("h2 a", item).text(),
        link: `/recipe/${recipeId}`,
        image: $(".desktop-img a img", item).attr("src"),
        ingrFast: [],
        id: recipeId,
      };
      $(".ingr_fast span", item).each((_index, value) =>
        article.ingrFast.push(value.children[0].data)
      );
      articles.push(article);
    });

    return articles;
  } catch (error) {
    return new Error(error as any);
  }
}
