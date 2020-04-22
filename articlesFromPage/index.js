const needle = require('needle');
const cheerio = require('cheerio');
const creatorurl = require('../urlcreate');

function getIngredientsObject($) {
    const ingredients = [];
    $('.ingredients-bl ul li > span').each((index, value) => {
        const ingredientAndAmount = {};
        let inner = $(value)
            .first()
            .contents()
            .filter(function() {
                return this.nodeType == 3;
            })
            .text()
            .match(/\([^)]*\)/);
        if (inner === null) {
            inner = '';
        } else {
            inner = inner.join();
        }
        ingredientAndAmount.item =
            $(value)
                .find("span[itemprop='name']")
                .text() + inner;
        ingredientAndAmount.amount = $(value)
            .find("span[itemprop='amount']")
            .text();

        ingredients.push(ingredientAndAmount);
    });
    return ingredients;
}
function newFormat(someText) {
    return someText.replace(/\s+/g, ' ').trim();
}
async function getArticle(link) {
    const response = await needle('get', link, { follow_max: 3 });
    const articleBody = cheerio.load(response.body, {
        decodeEntities: false,
    });
    return {
        name: articleBody('.item-about div h1').text(),
        link: link,
        image: articleBody('.item-about div .m-img img').attr('src'),
        reciep: newFormat(articleBody('.cooking-bl').text()),
        ingredients: getIngredientsObject(articleBody),
    };
}

async function articlesFromPage(ings, page) {
    try {
        if (ings.length == 0) {
            throw new Error('Empty ingredients array!');
        }
        const options = {
            follow_max: 3,
        };
        const URL = 'https://www.povarenok.ru/recipes/search/';
        const readyURL = creatorurl(URL, ings, page);
        const response = await needle('get', readyURL, options);
        if (response.statusCode != 200) {
            throw new Error(response.statusCode);
        }
        const $ = cheerio.load(response.body);

        const resultsNumber = $('div.sort-res div.bl-right strong').text();
        const nothingFound = 'ничего не найдено';
        if (resultsNumber === nothingFound) {
            console.log('no results');
            throw new Error('NO other recieps');
        }
        const articles = [];
        $('.item-bl').each((index, item) => {
            const article = {
                name: $('h2 a', item).text(),
                link:
                    '/recipe/' +
                    $('h2 a', item)
                        .attr('href')
                        .replace(/\/$/, '')
                        .split('/')
                        .pop(),
                image: $('.desktop-img a img', item).attr('src'),
            };
            const ingr_fast = [];
            $('.ingr_fast span', item).each((index, value) =>
                ingr_fast.push(value.children[0].data)
            );
            article['ingr-fast'] = ingr_fast;
            articles.push(article);
        });

        return articles;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { articlesFromPage, getArticle };
