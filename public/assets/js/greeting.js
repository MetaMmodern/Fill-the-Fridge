// eslint-disable-next-line import/extensions
import languages from './greetLanguages.js';

const Greeting = {
  languageSwitcher(event) {
    event.preventDefault();
    const btn = document.getElementById('currentLanguage');
    const title = document.querySelector('.modal-title');
    if (event.target.id !== btn.innerText) {
      const body = document.querySelector('.modal-body');
      switch (event.target.id) {
        case 'English':
          title.innerHTML = languages.English.title;
          body.innerHTML = '';
          body.appendChild(this.getModalBody(languages.English));
          btn.innerHTML = event.target.id;
          break;
        case 'Russian':
          title.innerHTML = languages.Russian.title;
          body.innerHTML = '';
          body.appendChild(this.getModalBody(languages.Russian));
          btn.innerHTML = event.target.id;

          break;
        default:
          break;
      }
    }
  },
  createLanguageSelector() {
    const buttons = Object.keys(languages).map(lang => {
      const btn = document.createElement('button');
      btn.setAttribute('id', lang);
      btn.setAttribute('type', 'button');
      btn.classList.add('dropdown-item');
      btn.innerHTML = lang;
      return btn;
    });
    console.log(buttons);
    return `<button type="button" class="btn btn-primary dropdown-toggle" id="currentLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Russian
                                </button>
                                <div class="dropdown-menu">
                                  ${buttons.map(b => b.outerHTML).join('')}
                                </div>`;
  },
  createCardBody(cardContents) {
    return Object.entries(cardContents)
      .map(([key, value]) => {
        let val = '';
        if (key.includes('content')) {
          val = `<p>${value}</p>`;
        } else if (key.includes('image')) {
          val = `<p><img class='introGif mx-auto d-block' src='${value}'></img></p>`;
        } else if (key.includes('annotation')) {
          val = `<i><p class='text-success'>${cardContents?.annotation ?? ''}</p></i>`;
        }
        return val;
      })
      .join('');
  },
  createCard(card) {
    const cardReady = document.createElement('div');
    cardReady.classList.add('card');
    const headingId = `heading${card[0]}`;
    const collapseId = `collapse${card[0]}`;
    cardReady.innerHTML = `<div class="card-header" id="${headingId}">
                            <h2 class="mb-0">
                              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                                ${card[1].header}
                                </button>
                            </h2>
                          </div>

                          <div id="${collapseId}" class="collapse" aria-labelledby="${headingId}" data-parent="#accordion">
                            <div class="card-body">
                              ${this.createCardBody(card[1])}
                              </div>
                          </div>`;
    return cardReady;
  },
  getModalBody(LanguageObj) {
    const accordion = document.createElement('div');
    accordion.setAttribute('id', 'accordion');
    const keyValArray = Object.entries(LanguageObj.modalBody);
    const allCard = keyValArray.map(card => {
      return this.createCard(card);
    });
    allCard.forEach(card => {
      accordion.appendChild(card);
    });
    return accordion;
  },
  initializeModal(langObject) {
    const outterModal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const title = document.createElement('h5');
    const languageSelector = document.createElement('div');
    const closeButton = document.createElement('button');
    const modalBody = document.createElement('div');
    const modalFooter = document.createElement('div');
    const closeFooter = document.createElement('button');
    outterModal.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalHeader.appendChild(title);
    modalHeader.appendChild(languageSelector);
    modalHeader.appendChild(closeButton);
    languageSelector.innerHTML = this.createLanguageSelector();
    languageSelector.classList.add('btn-group');
    languageSelector.classList.add('ml-auto');
    modalFooter.appendChild(closeFooter);
    outterModal.className = 'modal fade helpModal';
    outterModal.setAttribute('tab-index', '-1');
    outterModal.setAttribute('id', 'greetingModal');
    modalDialog.classList.add('modal-dialog');
    modalDialog.classList.add('modal-xl');
    modalDialog.classList.add('modal-dialog-scrollable');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalHeader.classList.add('align-items-center');
    title.classList.add('modal-title');
    title.innerHTML = langObject.title;
    closeButton.classList.add('close');
    closeButton.classList.add('ml-3');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.innerHTML = '<span class="material-icons" aria-hidden="true">close</span>';
    modalBody.classList.add('modal-body'); //  whole text
    modalBody.appendChild(this.getModalBody(langObject));
    modalFooter.classList.add('modal-footer');
    closeFooter.className = 'btn btn-primary';
    closeFooter.setAttribute('data-dismiss', 'modal');
    closeFooter.innerHTML = langObject.closeFooter;
    return outterModal;
  },
  checkIfNeeded() {
    if (localStorage.getItem('greeting') === null) this.sendGreeting();
    document.querySelector('.help').addEventListener('click', this.sendGreeting.bind(this));
  },
  sendGreeting(e) {
    if (e?.target.classList.contains('help')) {
      $('#greetingModal').modal('toggle');
      this.startScanning();
    } else {
      const lang = navigator.language || navigator.userLanguage;
      let modal = '';
      switch (lang) {
        case 'ru-RU':
          modal = this.initializeModal(languages.Russian);
          break;
        case 'en':
          modal = this.initializeModal(languages.English);
          break;
        default:
          modal = this.initializeModal(languages.English);
          break;
      }
      document.querySelector('body').prepend(modal);
      $('#greetingModal').modal('toggle');
      this.startScanning();
    }
  },
  startScanning() {
    Object.keys(languages).forEach(el => {
      document
        .getElementById(el.toString())
        .addEventListener('click', this.languageSwitcher.bind(this));
    });
  }
};

export default Greeting;
