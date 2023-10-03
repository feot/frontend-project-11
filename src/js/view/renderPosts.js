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
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', link);
    linkEl.classList.add('fw-bold');
    linkEl.setAttribute('data-id', id);
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('rel', 'noopener noreferrer');
    linkEl.textContent = title;
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonEl.setAttribute('data-id', id);
    buttonEl.setAttribute('data-bs-toggle', 'modal');
    buttonEl.setAttribute('data-bs-target', '#modal');
    buttonEl.textContent = i18n.t('post.info');
    postEl.append(linkEl, buttonEl);

    return postEl;
  });

  postsContainer.prepend(...postEls);
};
