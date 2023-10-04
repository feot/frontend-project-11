import getRss from './getRss.js';

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
  const watchStartTime = new Date();

  urls.forEach((url) => {
    getRss(url, state)
      .then((data) => filterPosts(data, state))
      .then((postsToRender) => {
        if (postsToRender.length) {
          state.posts.push(...postsToRender);
        }
      })
      .catch(() => null)
      .finally(() => {
        const watchEndTime = new Date();
        const watchPassedTime = watchEndTime - watchStartTime;
        const timeoutDelay = (watchPassedTime > delay) ? 0 : delay - watchPassedTime;

        setTimeout(() => rssUpdater(state, elements, i18n), timeoutDelay);
      });
  });
};

export default rssUpdater;
