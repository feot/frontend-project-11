import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import view from './view/view.js';

export default () => {
  const state = {
    urls: [],
    ui: {
      form: {
        error: 'noError',
        process: null,
      },
    },
  };
  const i18nConfig = {
    lng: 'en',
    debug: false,
    resources,
  };
  const i18nInstance = i18n.createInstance();
  i18nInstance.init(i18nConfig);

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
  };

  const watchedState = view(state, elements, i18nInstance);

  yup.setLocale({
    string: {
      url: 'urlInvalid',
    },
    mixed: {
      notOneOf: 'rssDuplicated',
    },
  });

  const validateUrl = (url, existingUrls) => {
    const schema = yup.string()
      .required()
      .url()
      .notOneOf(existingUrls);

    return schema.validate(url);
  };

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    const { urls: existingUrls } = state;

    watchedState.ui.form.process = 'loading';

    validateUrl(url, existingUrls)
      .then(() => {
        watchedState.ui.form.error = null;
        state.urls.push(url);
      })
      .catch((e) => {
        watchedState.ui.form.error = e.type;
      })
      .finally(() => {
        watchedState.ui.form.process = 'loaded';
      });
  });
};
