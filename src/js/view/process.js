export default (value, elements) => {
  const { input, submit, feedback } = elements;

  switch (value) {
    case 'loading':
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-success', 'text-danger');
      feedback.textContent = 'Loading...';
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
