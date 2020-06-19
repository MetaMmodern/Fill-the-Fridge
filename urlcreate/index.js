const uni = require('../UnicodeToWin');

function createPovarenokURLPage(URL, ings, page) {
  const encodedIngs = ings.map(ing => uni(ing));
  let link = URL;
  if (page) {
    link += `~${parseInt(page, 10)}/`;
  }
  link += '?ing=';
  for (let index = 0; index < encodedIngs.length; index++) {
    const element = encodedIngs[index];
    link += element;
    if (index < encodedIngs.length - 1) {
      link += '%2C+';
    }
  }
  //  will need later
  //  link += "&ing_exc=&kitchen=&type=&cat=&subcat=&orderby=#searchformtop";
  return link;
}

module.exports = createPovarenokURLPage;
