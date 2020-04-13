const needle = require("needle");
const cheerio = require("cheerio");
const creatorurl = require("../urlcreate");
function getNumber(str) {
  return parseFloat(str);
}
async function getPrice(ings) {
  try {
    if (ings === undefined) {
      throw new Error("No ingredients passed");
    }
    if (ings.length === 0) {
      throw new Error("empty array");
    }
    const URL = "http://mysupermarket.org.ua/index.php?search=";
    const readyURL = creatorurl(URL, ings, 0);
    const options = {
      headers: { Referer: "http://mysupermarket.org.ua/" },
    };
    let items = [];
    const response = await needle("get", readyURL, options);
    if (response.statusCode != 200) {
      throw new Error("Error, not 200");
    }
    const $ = cheerio.load(response.body);

    $("table:nth-child(4) td").each((index, value) => {
      let item = {
        name: "",
        pricesAndStores: [],
      };
      $(value)
        .find("p")
        .each((index, value) => {
          if ($(value).find("b").text() != "") {
            if ($(value).find("b").text().includes("grn.")) {
              item.pricesAndStores.push({
                store: $(value).find("a").text(),
                price: getNumber($(value).find("b").text()),
              });
            } else {
              item.name = $(value).find("b").text();
              item.name += " ";
              item.name += $(value).find("i").text();
            }
          }
        });

      items.push(item);
    });
    return items;
  } catch (error) {
    console.log(error);
  }
}
module.exports = getPrice;
