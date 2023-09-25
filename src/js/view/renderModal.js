export default (clickedNewsId, state, elements) => {
  const { news } = state;
  const newsItem = news.find(({ id }) => id === clickedNewsId);
  const {
    title,
    description,
    link,
  } = newsItem;
  const {
    title: titleEl,
    description: descriptionEl,
    link: linkEl,
  } = elements.modal;

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  linkEl.setAttribute('href', link);
};
