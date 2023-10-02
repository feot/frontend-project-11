import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import view from './view/view.js';
import validateUrl from './utils/validateUrl.js';
import getRss from './utils/getRss.js';
import rssUpdater from './utils/rssUpdater.js';

const getElements = () => ({
  headline: document.querySelector('h1'),
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  label: document.querySelector('[for="url-input"]'),
  submit: document.querySelector('[type="submit"]'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  postsHeadline: document.querySelector('.posts h2'),
  feeds: document.querySelector('.feeds'),
  feedsHeadline: document.querySelector('.feeds h2'),
  modal: {
    title: document.querySelector('.modal-title'),
    description: document.querySelector('.modal-body'),
    link: document.querySelector('.modal-footer a'),
    close: document.querySelector('.modal-footer [data-bs-dismiss]'),
  },
});

const applyInitialTexts = (elements, i18nInstance) => {
  const {
    headline,
    input,
    label,
    submit,
    postsHeadline,
    feedsHeadline,
  } = elements;
  const { link, close } = elements.modal;

  headline.textContent = i18nInstance.t('headline');
  input.placeholder = i18nInstance.t('form.inputPlaceholder');
  label.textContent = i18nInstance.t('form.inputPlaceholder');
  submit.textContent = i18nInstance.t('form.submit');
  postsHeadline.textContent = i18nInstance.t('layout.postsHeadline');
  feedsHeadline.textContent = i18nInstance.t('layout.feedsHeadline');
  link.textContent = i18nInstance.t('modal.read');
  close.textContent = i18nInstance.t('modal.close');
};

const app = (i18nInstance) => {
  const state = {
    urls: [],
    feeds: [],
    posts: [],
    ui: {
      form: {
        error: 'noError',
      },
      loadingProcess: null,
      viewedPosts: [],
      clickedPostId: null,
    },
  };

  const elements = getElements();

  const watchedState = view(state, elements, i18nInstance);

  yup.setLocale({
    string: {
      url: 'urlInvalid',
    },
    mixed: {
      notOneOf: 'rssDuplicated',
    },
  });

  window.addEventListener('DOMContentLoaded', () => applyInitialTexts(elements, i18nInstance));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    const { urls: existingUrls } = state;

    watchedState.ui.loadingProcess = 'loading';
    watchedState.ui.form.error = null;

    validateUrl(yup, url, existingUrls)
      .then(() => getRss(url, state))
      .then(({ feed, posts }) => {
        watchedState.ui.form.error = null;
        state.urls.push(url);
        watchedState.feeds = [...state.feeds, feed];
        watchedState.posts = [...state.posts, ...posts];

        watchedState.ui.loadingProcess = 'success';

        if (state.urls.length === 1) {
          setTimeout(() => rssUpdater(watchedState, elements, i18nInstance), 5000);
        }
      })
      .catch((e) => {
        watchedState.ui.form.error = e.type;
      })
      .finally(() => {
        watchedState.ui.loadingProcess = 'loaded';
      });
  });

  elements.posts.addEventListener('click', (event) => {
    const { target } = event;

    if (target.nodeName === 'BUTTON') {
      watchedState.ui.clickedPostId = target.dataset.id;
      watchedState.ui.viewedPosts.push(target.dataset.id);
    }

    if (target.nodeName === 'A') {
      watchedState.ui.viewedPosts.push(target.dataset.id);
    }
  });
};

export default () => {
  const i18nConfig = {
    lng: 'ru',
    debug: false,
    resources,
  };
  const i18nInstance = i18n.createInstance();

  i18nInstance.init(i18nConfig).then(() => app(i18nInstance));
};
