import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import view from './view/view.js';
import validateUrl from './utils/validateUrl.js';
import getRss from './utils/getRss.js';
import rssUpdater from './utils/rssUpdater.js';
import markLinkVisited from './utils/markLinkVisited.js';

export default () => {
  const state = {
    urls: [],
    channels: [],
    news: [],
    ui: {
      form: {
        error: 'noError',
        process: null,
      },
      clickedNewsId: null,
    },
  };
  const i18nConfig = {
    lng: 'ru',
    debug: false,
    resources,
  };
  const i18nInstance = i18n.createInstance();
  i18nInstance.init(i18nConfig);

  const elements = {
    headline: document.querySelector('h1'),
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    label: document.querySelector('[for="url-input"]'),
    submit: document.querySelector('[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    modal: {
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      link: document.querySelector('.modal-footer a'),
      close: document.querySelector('.modal-footer [data-bs-dismiss]'),
    },
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

  window.addEventListener('DOMContentLoaded', () => {
    const {
      headline,
      input,
      label,
      submit,
    } = elements;
    const { link, close } = elements.modal;

    headline.textContent = i18nInstance.t('headline');
    input.placeholder = i18nInstance.t('form.inputPlaceholder');
    label.textContent = i18nInstance.t('form.inputPlaceholder');
    submit.textContent = i18nInstance.t('form.submit');
    link.textContent = i18nInstance.t('modal.read');
    close.textContent = i18nInstance.t('modal.close');
  });

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    const { urls: existingUrls } = state;

    watchedState.ui.form.process = 'loading';
    watchedState.ui.form.error = null;

    validateUrl(yup, url, existingUrls)
      .then(() => getRss(url, state))
      .then(({ channel, news }) => {
        watchedState.ui.form.error = null;
        state.urls.push(url);
        watchedState.channels = [...state.channels, channel];
        watchedState.news = [...state.news, ...news];

        watchedState.ui.form.process = 'success';
      })
      .catch((e) => {
        watchedState.ui.form.error = e.type;
      })
      .finally(() => {
        watchedState.ui.form.process = 'loaded';
      });
  });

  elements.posts.addEventListener('click', (event) => {
    const { target } = event;

    if (target.nodeName === 'BUTTON') {
      watchedState.ui.clickedNewsId = target.dataset.id;
      markLinkVisited(target.dataset.id);
    }

    if (target.nodeName === 'A') {
      markLinkVisited(target.dataset.id);
    }
  });

  rssUpdater(state, elements, i18nInstance);
};
