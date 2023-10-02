export default (applyData) => {
  const { args: postId } = applyData;
  const linkEl = document.querySelector(`a[data-id="${postId}"]`);

  linkEl.classList.add('fw-normal', 'link-secondary');
  linkEl.classList.remove('fw-bold');
};
