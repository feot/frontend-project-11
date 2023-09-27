import getRss from './getRss.js';
import renderNews from '../view/renderNews.js';

const updater = (fn, watchStartTime, delay = 5000) => {
  const watchEndTime = new Date();
  const watchPassedTime = watchEndTime - watchStartTime;
  const timeoutDelay = (watchPassedTime > delay) ? 0 : delay - watchPassedTime;

  setTimeout(() => fn(), timeoutDelay);
};

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
  const watchStartTime = new Date();
  const requests = state.urls.map((url) => getRss(url, state));

  Promise.all(requests)
    .then((data) => filterNews(data, state))
    .then((newsToRender) => {
      if (newsToRender.length) {
        state.news.push(...newsToRender);
        renderNews(state, elements, i18n, newsToRender);
      }
    })
    .catch(() => null)
    .finally(() => {
      updater(() => rssUpdater(state, elements, i18n), watchStartTime);
    });
};

export default (state, elements, i18n) => {
  const watchStartTime = new Date();

  updater(() => rssUpdater(state, elements, i18n), watchStartTime);
};
