export default (linkId) => {
  const linkEl = document.querySelector(`a[data-id="${linkId}"]`);

  linkEl.classList.add('fw-normal', 'link-secondary');
  linkEl.classList.remove('fw-bold');
};
