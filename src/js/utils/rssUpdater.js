import getRss from './getRss.js';
import renderNews from '../view/renderNews.js';

const delay = 5000;
const filterNews = (data, state) => {
  const filteredNews = [];

  data.forEach(({ channel, news }) => {
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

    filteredNews.push(...newNews);
  });

  return filteredNews;
};

const rssUpdater = (state, elements, i18n) => {
  const { urls, news } = state;

  if (!urls.length) {
    return;
  }

  const watchStartTime = new Date();
  const requests = urls.map((url) => getRss(url, state));

  Promise.all(requests)
    .then((data) => filterNews(data, state))
    .then((newsToRender) => {
      if (newsToRender.length) {
        news.push(...newsToRender);
        renderNews(state, elements, i18n, newsToRender);
      }
    })
    .catch(() => null)
    .finally(() => {
      const watchEndTime = new Date();
      const watchPassedTime = watchEndTime - watchStartTime;
      const timeoutDelay = (watchPassedTime > delay) ? 0 : delay - watchPassedTime;

      setTimeout(() => rssUpdater(state, elements, i18n), timeoutDelay);
    });
};

export default rssUpdater;
