const needle = require('needle');
const cheerio = require('cheerio');
const creatorurl = require('../urlcreate');

function getNumber(str) {
  return parseFloat(str);
}
async function getPrice(ings) {
  try {
    if (ings === undefined) {
      throw new Error('No ingredients passed');
    }
    if (ings.length === 0) {
      throw new Error('empty array');
    }
    const URL = 'http://mysupermarket.org.ua/index.php?search=';
    const readyURL = creatorurl(URL, ings, 0);
    const options = {
      headers: { Referer: 'http://mysupermarket.org.ua/' }
    };
    const items = [];
    const response = await needle('get', readyURL, options);
    if (response.statusCode !== 200) {
      throw new Error('Error, not 200');
    }
    const $ = cheerio.load(response.body);

    $('table:nth-child(4) td').each((index, value) => {
      const item = {
        name: '',
        pricesAndStores: []
      };
      $(value)
        .find('p')
        .each((_index, elem) => {
          if (
            $(elem)
              .find('b')
              .text() !== ''
          ) {
            if (
              $(elem)
                .find('b')
                .text()
                .includes('grn.')
            ) {
              item.pricesAndStores.push({
                store: $(elem)
                  .find('a')
                  .text(),
                price: getNumber(
                  $(elem)
                    .find('b')
                    .text()
                )
              });
            } else {
              item.name = $(value)
                .find('b')
                .text();
              item.name += ' ';
              item.name += $(value)
                .find('i')
                .text();
            }
          }
        });

      items.push(item);
    });
    return items;
  } catch (error) {
    return new Error(error);
  }
}
module.exports = getPrice;
