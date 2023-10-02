import getRss from './getRss.js';

const delay = 5000;
const filterNews = ({ channel, news }, state) => {
  const oldChannelNews = state.news.filter((newsItem) => {
    const { channelId } = newsItem;

    return channelId === channel.id;
  });
  const newNews = news.filter((newItem) => {
    const { link: newItemLink } = newItem;

    return !oldChannelNews.some((oldNewsItem) => {
      const { link: oldItemLink } = oldNewsItem;

      return oldItemLink === newItemLink;
    });
  });

  return newNews;
};

const rssUpdater = (state, elements, i18n) => {
  const { urls, news } = state;
  const watchStartTime = new Date();

  urls.forEach((url) => {
    getRss(url, state)
      .then((data) => filterNews(data, state))
      .then((newsToRender) => {
        if (newsToRender.length) {
          news.push(...newsToRender);
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
