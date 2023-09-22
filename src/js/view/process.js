export default (value, elements) => {
  const { input, submit } = elements;

  switch (value) {
    case 'loading':
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
