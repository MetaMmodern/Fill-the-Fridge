/* eslint-disable no-param-reassign */
// Настройка AJAX запроса
async function SubmitForm(allTags, searchPageNum) {
  let answer = '';
  if (allTags.join('').length !== 0) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ings: allTags })
    };
    const response = await fetch(`/recipes/search/${searchPageNum}`, options);
    if (response.status >= 200 && response.status < 300) {
      answer = await response.text();
    } else {
      answer = 'nothing found, try changing your request';
    }
  }
  return answer;
}

export default SubmitForm;
