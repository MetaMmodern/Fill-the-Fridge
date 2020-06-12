const English = {
  title: 'Welcome to Fill the Fridge!',
  modalBody: {
    aboutWebsite: {
      header: '',
      content: ''
    },
    aboutSearch: {
      header: '',
      content: ''
    },
    aboutRecipes: {
      header: '',
      content: ''
    },
    aboutMap: {
      header: '',
      content: ''
    },
    Goodbye: {
      header: '',
      content: ''
    }
  },

  closeFooter: 'Close'
};
const Russian = {
  title: 'Добро пожаловать на Fill the Fridge!',
  modalBody: {
    aboutWebsite: {
      header: '',
      content: ''
    },
    aboutSearch: {
      header: '',
      content: ''
    },
    aboutRecipes: {
      header: '',
      content: ''
    },
    aboutMap: {
      header: '',
      content: ''
    },
    Goodbye: {
      header: '',
      content: ''
    }
  },

  closeFooter: 'Закрыть'
};
const Greeting = {
  getModalBody() {
    const accordion = document.createElement('div');
    accordion.setAttribute('id', 'accordion');

    return accordion;
  },
  initializeModal(langObject) {
    const outterModal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const title = document.createElement('h5');
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
    modalHeader.appendChild(closeButton);
    modalFooter.appendChild(closeFooter);
    outterModal.className = 'modal fade';
    outterModal.setAttribute('tab-index', '-1');
    outterModal.setAttribute('id', 'greetingModal');
    modalDialog.classList.add('modal-dialog');
    modalDialog.classList.add('modal-xl');
    modalDialog.classList.add('modal-dialog-scrollable');

    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    title.classList.add('modal-title');
    title.innerHTML = langObject.title;
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
    modalBody.classList.add('modal-body'); //  whole text
    modalBody.innerHTML = langObject.modalBody;
    modalFooter.classList.add('modal-footer');
    closeFooter.className = 'btn btn-primary';
    closeFooter.setAttribute('data-dismiss', 'modal');
    closeFooter.innerHTML = langObject.closeFooter;
    return outterModal;
  },
  checkIfNeeded() {
    if (localStorage.getItem('greeting') === null) this.sendGreeting();
  },
  sendGreeting() {
    const lang = navigator.language || navigator.userLanguage;
    let modal = '';
    switch (lang) {
      case 'ru-RU':
        modal = this.initializeModal(Russian);
        break;
      case 'en':
        modal = this.initializeModal(English);
        break;
      default:
        modal = this.initializeModal(English);
        break;
    }
    document.querySelector('body').prepend(modal);
    $('#greetingModal').modal('toggle');
    this.startScanning();
  },
  startScanning() {}
};

export default Greeting;
