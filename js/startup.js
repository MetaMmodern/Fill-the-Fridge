// eslint-disable-next-line import/extensions
import addTags from './tagsinput.js';

export default function localStorageSetter(container) {
  let smthfromLS = JSON.parse(localStorage.getItem('tags'));
  if (smthfromLS === null) {
    smthfromLS = [];
    localStorage.setItem('tags', JSON.stringify([]));
  }
  if (smthfromLS.length > 0) {
    addTags(smthfromLS, container);
  }
  return smthfromLS;
}
