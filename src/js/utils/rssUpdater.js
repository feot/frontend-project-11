import getRss from './getRss.js';
import renderNews from '../view/renderNews.js';

const updater = (fn, watchStartTime, delay = 5000) => {
  const watchEndTime = new Date();
  const watchPassedTime = watchEndTime - watchStartTime;
  const timeoutDelay = (watchPassedTime > delay) ? 0 : delay - watchPassedTime;

  setTimeout(() => fn(), timeoutDelay);
};

const rssUpdater = (state, elements, i18n) => {
  const watchStartTime = new Date();
  const { urls } = state;
  const newsToRender = [];

  const requests = urls.map((url) => getRss(url, state));

  Promise.all(requests)
    .then((responses) => {
      responses.forEach(({ channel, news }) => {
        const oldChannelNews = state.news.filter((newsItem) => {
          const { channelId } = newsItem;

          return channelId === channel.id;
        });

        const newNews = news.filter((newItem) => {
          const { link: newItemLink } = newItem;

          return !oldChannelNews.some(({ link: oldItemLink }) => oldItemLink === newItemLink);
        });
        newsToRender.push(...newNews);
      });
    })
    .then(() => {
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
