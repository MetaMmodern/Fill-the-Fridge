/* eslint-disable import/extensions */
import SubmitForm from './ajax.js';

import addTags from './tagsinput.js';

import localStorageSetter from './startup.js';

import { popup, loadCartsAndMap } from './popupload.js';

document.addEventListener('DOMContentLoaded', async () => {
  const Main = {
    form: document.forms[0],
    container: document.querySelector('.tag-container'),
    loadPageNum: 2,
    olderInput: [],
    allTags: localStorageSetter(document.querySelector('.tag-container')),
    scrollPos: 0,
    input: document.querySelector('.tag-container input'),
    searchResultContainer: document.getElementById('search-results-container'),
    // main point of entrance
    starter() {
      this.inputWorker();
      // below is check for fullrecipePage
      if (this.isFullPage()) {
        window.removeEventListener('scroll', this);
        loadCartsAndMap();
      }
    },
    // hadler for keyup event
    keyup(e) {
      if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        this.input.value !== '' &&
        this.input.value.split(' ').join('') !== ''
      ) {
        this.allTags.push(this.input.value);
        localStorage.setItem('tags', JSON.stringify(this.allTags));
        addTags(this.allTags, this.container);
        this.input.value = '';
        this.input.removeAttribute('placeholder');
      }
      if (e.key === 'Backspace' && this.input.value === '' && this.allTags.length > 0) {
        e.preventDefault();
        this.input.setAttribute('placeholder', 'Ingredients');
        this.input.value = this.allTags[this.allTags.length - 1];
        this.allTags = [...this.allTags.slice(0, this.allTags.length - 1)];
        localStorage.setItem('tags', JSON.stringify(this.allTags));
        addTags(this.allTags, this.container);
      }
    },
    // handler for all click events
    click(e) {
      if (e.target.classList.contains('tagCloser')) {
        const value = e.target.getAttribute('data-item');
        const index = this.allTags.indexOf(value);
        this.allTags = [...this.allTags.slice(0, index), ...this.allTags.slice(index + 1)];
        localStorage.setItem('tags', JSON.stringify(this.allTags));
        addTags(this.allTags, this.container);
        if (this.allTags.length === 0) {
          this.input.setAttribute('placeholder', 'Ingredients');
        }
      } else if (e.target.classList.contains('cleaner')) {
        this.allTags = [];
        addTags([], this.container);
        localStorage.setItem('tags', JSON.stringify([]));
      } else if (e.target.matches('a.recipe-link')) {
        popup(e);
      }
    },
    // attaches listeners on input field
    inputWorker() {
      if (this.allTags.length === 0) this.input.setAttribute('placeholder', 'Ingredients');
      this.input.addEventListener('keyup', this);
      document.addEventListener('click', this);
      this.form.addEventListener('keypress', this);
      this.form.addEventListener('submit', this);
    },
    //  handles all events added by addEventListener
    handleEvent(e) {
      switch (e.type) {
        case 'scroll':
          this.infinity(e);
          break;
        case 'keyup':
          this.keyup(e);
          break;
        case 'click':
          this.click(e);
          break;
        case 'submit':
          this.firstAjax(e);
          break;
        case 'keypress':
          if (e.key === 'Enter') e.preventDefault();
          break;
        default:
          break;
      }
    },
    // checker for full reciep page
    isFullPage() {
      if (
        document.getElementsByClassName('toDelete')[0] !== undefined &&
        document.getElementsByClassName('toDelete')[0].innerHTML !== ''
      ) {
        return true;
      }
      return false;
    },
    // used for ajax load by fetch
    anyAJAXLoad: SubmitForm,
    // infinity content loader
    async infinity() {
      if (
        //  ref https://codepen.io/lehollandaisvolant/pen/ryrrGx?editors=0010
        //  ref http://jsfiddle.net/8PkQN/1/
        document.body.getBoundingClientRect().top <= this.scrollPos &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
      ) {
        window.removeEventListener('scroll', this);

        if (this.allTags.join('').length !== 0) {
          document.getElementById('loading').innerHTML =
            "<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>";
          const response = await this.anyAJAXLoad(this.allTags, this.loadPageNum);
          this.loadPageNum += 1;
          this.searchResultContainer.insertAdjacentHTML('beforeend', response);
          document.getElementById('loading').innerHTML = '';
          if (response !== 'nothing found, try changing your request') {
            window.addEventListener('scroll', this);
          }
        }
      }
      // saves the new position for iteration.
      this.scrollPos = document.body.getBoundingClientRect().top;
    },
    // first request loader
    async firstAjax(event) {
      event.preventDefault();
      if (
        this.allTags.join('').length !== 0 &&
        [...new Set(this.olderInput.slice().sort())].join() !==
          [...new Set(this.allTags.slice().sort())].join()
      ) {
        if (document.getElementsByClassName('toDelete')[0] !== undefined) {
          document.getElementsByClassName('toDelete')[0].innerHTML = '';
          document.getElementsByClassName('toDelete')[0].style.border = 'none';
        }
        this.loadPageNum = 2;
        document.getElementById('reloading').innerHTML =
          "<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>";
        this.searchResultContainer.style.filter = 'blur(5px) opacity(50%)';
        this.searchResultContainer.innerHTML = await this.anyAJAXLoad(this.allTags, 1);
        this.searchResultContainer.style.filter = 'none';
        document.getElementById('reloading').innerHTML = '';
        this.olderInput = [...this.allTags];
        window.history.pushState('search', 'page 1', '/');
        window.addEventListener('scroll', this);
      }
    }
  };
  Main.starter();
});
