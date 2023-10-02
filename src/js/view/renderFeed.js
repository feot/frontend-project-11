export default (state, elements) => {
  const { feeds: feedsEl } = elements;
  const isContainerEmpty = !feedsEl.querySelectorAll('.list-group-item').length;

  if (isContainerEmpty) {
    feedsEl.classList.remove('d-none');
  }

  const feedsContainer = feedsEl.querySelector('ul');
  const feedEl = document.createElement('li');
  const { feeds } = state;
  const {
    title: feedTitle,
    description: feedDescription,
  } = feeds.at(-1);

  feedEl.classList.add('list-group-item', 'border-0', 'border-end-0');
  feedEl.innerHTML = `<h3 class="h6 m-0">${feedTitle}</h3><p class="m-0 small text-black-50">${feedDescription}</p>`;

  feedsContainer.prepend(feedEl);
};
