export default (state, elements) => {
  const { feeds } = elements;
  const isContainerEmpty = !feeds.querySelectorAll('.list-group-item').length;

  if (isContainerEmpty) {
    feeds.classList.remove('d-none');
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
