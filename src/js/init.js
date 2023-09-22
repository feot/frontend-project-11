import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import view from './view/view.js';
import validateUrl from './utils/validateUrl.js';
import getRss from './utils/getRss.js';
import parse from './utils/parse.js';
import renderNews from './view/renderNews.js';

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
    submit: document.querySelector('[type="submit"]'),
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

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    const { urls: existingUrls } = state;

    watchedState.ui.form.process = 'loading';

    validateUrl(yup, url, existingUrls)
      .then(() => getRss(url))
      .then((data) => parse(data))
      .then((channelData) => {
        watchedState.ui.form.error = null;
        state.urls.push(url);
        renderNews(channelData);
      })
      .catch((e) => {
        watchedState.ui.form.error = e.type;
      })
      .finally(() => {
        watchedState.ui.form.process = 'loaded';
      });
  });
};
