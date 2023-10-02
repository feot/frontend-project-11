export default (clickedPostId, state, elements) => {
  const { posts } = state;
  const post = posts.find(({ id }) => id === clickedPostId);
  const {
    title,
    description,
    link,
  } = post;
  const {
    title: titleEl,
    description: descriptionEl,
    link: linkEl,
  } = elements.modal;

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  linkEl.setAttribute('href', link);
};
