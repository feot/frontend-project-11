import loadRss from './loadRss.js';

const delay = 5000;
const filterPosts = ({ feed, posts }, state) => {
  const oldFeedPosts = state.posts.filter((post) => {
    const { feedId } = post;

    return feedId === feed.id;
  });
  const newPosts = posts.filter((newItem) => {
    const { link: newItemLink } = newItem;

    return !oldFeedPosts.some((oldPosts) => {
      const { link: oldItemLink } = oldPosts;

      return oldItemLink === newItemLink;
    });
  });

  return newPosts;
};

const rssUpdater = (state, elements, i18n) => {
  const urls = state.feeds.map((feed) => feed.url);
  const requests = urls.map((url) => loadRss(url, state));

  requests.forEach((request) => request
    .then((data) => {
      const postsToRender = filterPosts(data, state);

      if (postsToRender.length) {
        state.posts.push(...postsToRender);
      }
    })
    .catch(() => null));

  Promise.all(requests)
    .finally(() => setTimeout(() => rssUpdater(state, elements, i18n), delay))
    .catch(() => null);
};

export default rssUpdater;
