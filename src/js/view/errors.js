export default (value, elements, i18n) => {
  if (value === null) {
    return;
  }

  const { input, feedback } = elements;

  input.classList.add('is-invalid');
  feedback.classList.add('text-danger');

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
};
