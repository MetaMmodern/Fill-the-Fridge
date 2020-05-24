function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const labelDiv = document.createElement('div');
  labelDiv.innerHTML = label;
  const close = document.createElement('span');
  close.setAttribute('class', 'material-icons');
  close.setAttribute('data-item', label);
  close.innerHTML = 'close';
  div.appendChild(labelDiv);
  div.appendChild(close);
  return div;
}

function reset() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags(allTags, container) {
  reset();
  allTags
    .slice()
    .reverse()
    .forEach(el => {
      const tag = createTag(el);
      container.prepend(tag);
    });
}
export default addTags;
