import onChange from 'on-change';
import processHandler from './process.js';
import errorsHandler from './errors.js';
import renderChannel from './renderChannel.js';
import renderNews from './renderNews.js';
import renderModal from './renderModal.js';

const render = (state, elements, i18n) => (path, value) => {
  switch (path) {
    case 'ui.form.process':
      processHandler(value, elements);
      break;

    case 'ui.form.error':
      errorsHandler(value, elements, i18n);
      break;

    case 'ui.clickedNewsId':
      renderModal(value, state, elements);
      break;

    case 'channels':
      renderChannel(state, elements);
      break;

    case 'news':
      renderNews(state, elements);
      break;

    default:
      throw new Error(`Unknown state change path: ${path}`);
  }
};

export default (state, elements, i18n) => onChange(state, render(state, elements, i18n));
