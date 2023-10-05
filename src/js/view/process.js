export default (value, elements, i18n) => {
  const {
    form,
    input,
    submit,
    feedback,
  } = elements;

  switch (value) {
    case 'loading':
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-success', 'text-danger');
      feedback.textContent = i18n.t('loading');
      submit.disabled = true;
      break;

    case 'success':
      form.reset();
      input.focus();
      submit.disabled = false;
      feedback.classList.add('text-success');
      feedback.textContent = i18n.t('success');
      break;

    case 'failure':
      submit.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${value}`);
  }
};
