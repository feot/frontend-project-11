export default (state, elements, i18n, specificNews) => {
  const { posts } = elements;

  if (!posts.children.length) {
    posts.innerHTML = `<div class="card border-0">
    <div class="card-body"><h2 class="card-title h4">Posts</h2></div>
    <ul class="list-group border-0 rounded-0"></ul></div>`;
  }

  const newsContainer = posts.querySelector('ul');
  let newToRender;

  if (specificNews) {
    newToRender = [...specificNews];
  } else {
    const { channels, news } = state;
    const lastChannel = channels.at(-1);
    const { id: lastChannelId } = lastChannel;
    newToRender = news.filter(({ channelId }) => channelId === lastChannelId);
  }

  const newsEls = newToRender.map((newsItem) => {
    const {
      id,
      title,
      link,
    } = newsItem;

    const newsEl = document.createElement('li');

    newsEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    newsEl.innerHTML = `<a href="${link}" class="fw-bold" data-id="${id}" target="_blank" rel="noopener noreferrer">${title}</a><button type="button" class="btn btn-outline-primary btn-sm" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('post.info')}</button>`;

    return newsEl;
  });

  newsContainer.prepend(...newsEls);
};
