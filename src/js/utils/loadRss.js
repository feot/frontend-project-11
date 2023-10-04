import axios from 'axios';
import parse from './parse.js';
import genId from './genId.js';

const addProxy = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');

  return urlWithProxy.toString();
};

export default (url, state) => {
  const requestUrl = addProxy(url);

  return axios(requestUrl)
    .then(({ data }) => {
      const parsedData = parse(data.contents);
      const { feeds: addedFeeds } = state;
      const existingFeed = addedFeeds.find((addedFeed) => addedFeed.url === url);
      let feed;

      if (existingFeed) {
        feed = existingFeed;
      } else {
        feed = parsedData.feed;
        feed.id = genId();
        feed.url = url;
      }

      const posts = parsedData.posts.map((post) => (
        {
          ...post,
          id: genId(),
          feedId: feed.id,
        }
      ));

      return { feed, posts };
    })
    .catch((e) => {
      if (e.type !== 'notRss') {
        e.type = 'network';
      }
      throw e;
    });
};
