import onChange from 'on-change';
import processHandler from './process.js';
import errorsHandler from './errors.js';

const render = (state, elements) => (path, value) => {
  switch (path) {
    case 'ui.form.process':
      processHandler(elements);
      break;

    case 'ui.form.error':
      errorsHandler(value, elements);
      break;

    default:
      throw new Error(`Unknown state change path: ${path}`);
  }
};

export default (state, elements) => onChange(state, render(state, elements));
