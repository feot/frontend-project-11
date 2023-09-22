export default (value, elements, i18n) => {
  const {
    form,
    input,
    feedback,
  } = elements;

  if (value === null) {
    form.reset();
    input.classList.remove('is-invalid');
    feedback.textContent = '';
    return;
  }

  input.classList.add('is-invalid');

  switch (value) {
    case 'url':
      feedback.textContent = i18n.t(`errors.${value}`);
      break;

    case 'notOneOf':
      feedback.textContent = i18n.t(`errors.${value}`);
      break;

    case 'notRss':
      feedback.textContent = i18n.t(`errors.${value}`);
      break;

    case 'network':
      feedback.textContent = i18n.t(`errors.${value}`);
      break;

    default:
      throw new Error(`Unknown error: ${value}`);
  }

  input.focus();
};
