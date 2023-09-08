export default (value, elements) => {
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
      feedback.textContent = 'Link must be valid';
      break;

    case 'notOneOf':
      feedback.textContent = 'Link already added';
      break;

    default:
      throw new Error(`Unknown error: ${value}`);
  }

  input.focus();
};
