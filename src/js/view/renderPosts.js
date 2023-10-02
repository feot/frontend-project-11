export default (state, elements, i18n, applyData) => {
  const { posts: postsEl } = elements;
  const isContainerEmpty = !postsEl.querySelectorAll('.list-group-item').length;

  if (isContainerEmpty) {
    postsEl.classList.remove('d-none');
  }

  const postsContainer = postsEl.querySelector('ul');
  let newToRender;

  if (applyData) {
    const { args: newItems } = applyData;
    newToRender = newItems;
  } else {
    const { feeds, posts } = state;
    const lastFeed = feeds.at(-1);
    const { id: lastFeedId } = lastFeed;
    newToRender = posts.filter(({ feedId }) => feedId === lastFeedId);
  }

  const postEls = newToRender.map((post) => {
    const {
      id,
      title,
      link,
    } = post;

    const postEl = document.createElement('li');

    postEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    postEl.innerHTML = `<a href="${link}" class="fw-bold" data-id="${id}" target="_blank" rel="noopener noreferrer">${title}</a><button type="button" class="btn btn-outline-primary btn-sm" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('post.info')}</button>`;

    return postEl;
  });

  postsContainer.prepend(...postEls);
};
