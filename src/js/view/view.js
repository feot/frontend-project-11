import onChange from 'on-change';
import processHandler from './process.js';
import errorsHandler from './errors.js';
import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import postViewHandler from './postView.js';

const render = (state, elements, i18n) => (path, value, _, applyData) => {
  switch (path) {
    case 'ui.loadingProcess':
      processHandler(value, elements, i18n);
      break;

    case 'ui.form.error':
      errorsHandler(value, elements, i18n);
      break;

    case 'ui.clickedPostId':
      renderModal(value, state, elements);
      break;

    case 'ui.viewedPosts':
      postViewHandler(applyData);
      break;

    case 'feeds':
      renderFeed(state, elements);
      break;

    case 'posts':
      renderPosts(state, elements, i18n, applyData);
      break;

    default:
      throw new Error(`Unknown state change path: ${path}`);
  }
};

export default (state, elements, i18n) => onChange(state, render(state, elements, i18n));
