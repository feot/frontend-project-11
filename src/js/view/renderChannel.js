export default (state, elements, i18n) => {
  const { feeds } = elements;

  if (!feeds.children.length) {
    feeds.innerHTML = `<div class="card border-0">
    <div class="card-body"><h2 class="card-title h4">${i18n.t('layout.channelsHeadline')}</h2></div>
    <ul class="list-group border-0 rounded-0"></ul></div>`;
  }

  const channelsContainer = feeds.querySelector('ul');
  const channelEl = document.createElement('li');
  const { channels } = state;
  const {
    title: channelTitle,
    description: channelDescription,
  } = channels.at(-1);

  channelEl.classList.add('list-group-item', 'border-0', 'border-end-0');
  channelEl.innerHTML = `<h3 class="h6 m-0">${channelTitle}</h3><p class="m-0 small text-black-50">${channelDescription}</p>`;

  channelsContainer.prepend(channelEl);
};
