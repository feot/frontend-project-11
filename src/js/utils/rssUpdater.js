import loadRss from './loadRss.js';

const delay = 5000;
const filterPosts = ({ feed, posts }, state) => {
  const oldFeedPosts = state.posts.filter(({ feedId }) => feedId === feed.id);
  const newPosts = posts.filter((newItem) => {
    const { link: newItemLink } = newItem;

    return !oldFeedPosts.some(({ link: oldItemLink }) => oldItemLink === newItemLink);
  });

  return newPosts;
};

const rssUpdater = (state, elements, i18n) => {
  const urls = state.feeds.map((feed) => feed.url);
  const promisesFeeds = urls.map((url) => loadRss(url, state))
    .then((data) => {
      const postsToRender = filterPosts(data, state);

      if (postsToRender.length) {
        state.posts.push(...postsToRender);
      }
    })
    .catch((error) => console.log(error));

  Promise.all(promisesFeeds)
    .catch((error) => console.log(error))
    .finally(() => setTimeout(() => rssUpdater(state, elements, i18n), delay));
};

export default rssUpdater;
