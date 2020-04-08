const needle = require("needle");
const cheerio = require("cheerio");
const creatorurl = require("./urlcreate");
const URL = "http://mysupermarket.org.ua/index.php?search=";
const ings = ["вода"];
const readyURL = creatorurl(URL, ings, 0);
console.log(readyURL);
function getNumber (str)
{
    return parseFloat(str);
}
async function getPrice() {
    let options = {
        headers: { Referer: "http://mysupermarket.org.ua/" },
    };

    const response = await needle("get", readyURL, options);

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
                            price: getNumber ($(value).find("b").text()),
                        });
                    } else {
                        item.name = $(value).find("b").text();
                        item.name += " ";
                        item.name += $(value).find("i").text();
                    }
                }
            });

        console.log(item);
    });
}
getPrice();
