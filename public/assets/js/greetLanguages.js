const English = {
  title: 'Welcome to Fill the Fridge!',
  modalBody: {
    aboutWebsite: {
      header: 'What is Fill The Fridge?',
      content: ''
    },
    aboutSearch: {
      header: 'About search bar',
      content: ''
    },
    aboutRecipes: {
      header: 'About recipes',
      content: ''
    },
    aboutMap: {
      header: 'Aboup Map',
      content: ''
    }
  },
  Goodbye: {
    header: '',
    content: ''
  },
  closeFooter: 'Close'
};
const Russian = {
  title: 'Добро пожаловать на Fill the Fridge!',
  modalBody: {
    aboutWebsite: {
      header: 'Что такое Fill the Fridge?',
      content1:
        'Этот сайт создан для удобного поиска рецептов по введённым ингредиентам. Для того, чтоб правильно им воспользоваться, пожалуйста прочитайте инструкцию ниже.',
      annotation:
        'Вы можете вернуться к этой иинструкции нажав на знак вопроса в правом верхнему углу сайта.'
    },
    aboutSearch: {
      header: 'Про строку поиска',
      content1:
        'Для ввода ингредиентов нажимайте клавишу Enter после каждого введённого ингредиента как на изображении ниже. Это позволит вам вводить ингредиенты с пробелами, например "мука пшеничная" или "масло сливочное".',
      image1: '../assets/images/ogimage.png',

      content2:
        'Для удаления ингредиента из строки поиска достаточно нажать на крестик рядом с нужным тегом как на изображении ниже.',
      content3:
        'Для удаления всех введённых ингредиентов нажмите на зелёную кнопку "Clear the Fridge".',
      annotation:
        'Вы можете не переживать за сохранность введённой информации: введённые ингредиенты сохраняются в данных вашего браузера даже после перезагрузки устройства, потому они будут удалены только если вы удалите браузер или сами очистите эту информацию.'
    },
    aboutRecipes: {
      header: 'Про рецепты',
      content:
        'Для начала поиска рецептов нажмите на кнопку Search recipes. Дождитесь отобржения списка рецептов. Если не будет найдено рецептов по вашим критериям поиска, вы увидите соответсвующую надпись. '
    },
    aboutMap: {
      header: 'Про карту',
      content1: '',
      annotation: ''
    }
  },
  Goodbye: {
    header: '',
    content1: ''
  },
  closeFooter: 'Закрыть'
};

export default { English, Russian };
