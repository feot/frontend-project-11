import * as yup from 'yup';
import view from './view/view.js';

export default () => {
  const state = {
    urls: [],
    ui: {
      form: {
        error: null,
        process: null,
      },
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
  };

  const watchedState = view(state, elements);

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
      .url('urlInvalid')
      .notOneOf(existingUrls, 'rssDuplicated');

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
      });

    watchedState.ui.form.process = 'loaded';
  });
};
