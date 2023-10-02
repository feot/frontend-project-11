export default (value, elements, i18n) => {
  if (value === null) {
    return;
  }

  const { input, feedback } = elements;

  input.classList.add('is-invalid');
  feedback.classList.add('text-danger');

  feedback.textContent = i18n.t(`errors.${value}`);
};
