export default (value, elements, i18n) => {
  const { input, submit, feedback } = elements;

  switch (value) {
    case 'loading':
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-success', 'text-danger');
      feedback.textContent = i18n.t('loading');
      submit.disabled = true;
      break;

    case 'loaded':
      input.focus();
      submit.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${value}`);
  }
};
