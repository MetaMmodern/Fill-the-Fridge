const needle = require("needle");
const cheerio = require("cheerio");
const creatorurl = require("../urlcreate");

function getIngredientsObject($) {
  let ingredients = [];
  $(".ingredients-bl ul li > span").each((index, value) => {
    let ingredientAndAmount = {};
    let inner = $(value)
      .first()
      .contents()
      .filter(function () {
        return this.nodeType == 3;
      })
      .text()
      .match(/\([^)]*\)/);
    if (inner === null) {
      inner = "";
    } else {
      inner = inner.join();
    }
    ingredientAndAmount.item =
      $(value).find("span[itemprop='name']").text() + inner;
    ingredientAndAmount.amount = $(value)
      .find("span[itemprop='amount']")
      .text();

    ingredients.push(ingredientAndAmount);
  });
  return ingredients;
}
function newFormat(someText) {
  return someText.replace(/\s+/g, " ").trim();
}
function getArticles(links) {
  let promises = [];
  links.forEach((link, index) => {
    promises.push(
      needle("get", link).then(function (response) {
        const articleBody = cheerio.load(response.body, {
          decodeEntities: false,
        });
        return {
          id: index,
          name: articleBody(".item-about div h1").text(),
          link: link,
          image: articleBody(".item-about div .m-img img").attr("src"),
          reciep: newFormat(articleBody(".cooking-bl").text()),
          ingredients: getIngredientsObject(articleBody),
        };
      })
    );
  });
  return Promise.all(promises);
}

async function articlesFromPage(ings, page) {
  try {
    if (ings.length == 0) {
      throw new Error("Empty ingredients array!");
    }
    const URL = "https://www.povarenok.ru/recipes/search/";
    const readyURL = creatorurl(URL, ings, page);
    const response = await needle("get", readyURL);
    if (response.statusCode != 200) {
      throw new Error(response.statusCode);
    }
    const $ = cheerio.load(response.body);

    const resultsNumber = $("div.sort-res div.bl-right strong").text();
    const nothingFound = "ничего не найдено";
    if (resultsNumber === nothingFound) {
      console.log("no results");
      throw new Error("NO other recieps");
    } else {
      console.log("done");
    }
    let links = [];
    $(".item-bl h2 a").each(async (index, value) => {
      await links.push($(value).attr("href"));
    });
    const articles = await getArticles(links);
    return articles;
  } catch (error) {
    console.log(error);
  }
}

module.exports = articlesFromPage;
