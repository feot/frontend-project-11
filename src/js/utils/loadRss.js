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
  const error = new Error();
  error.type = 'network';

  return axios(requestUrl)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw error;
    })
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
      if (e.type) {
        throw e;
      } else {
        throw error;
      }
    });
};
