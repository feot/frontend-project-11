import onChange from 'on-change';
import processHandler from './process.js';
import errorsHandler from './errors.js';

const render = (_, elements, i18n) => (path, value) => {
  switch (path) {
    case 'ui.form.process':
      processHandler(elements);
      break;

    case 'ui.form.error':
      errorsHandler(value, elements, i18n);
      break;

    default:
      throw new Error(`Unknown state change path: ${path}`);
  }
};

export default (state, elements, i18n) => onChange(state, render(state, elements, i18n));
