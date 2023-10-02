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

  return fetch(requestUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw error;
    })
    .then((data) => parse(data.contents))
    .then((parsedData) => {
      const { channels: addedChannels } = state;
      const existingChannel = addedChannels.find((addedChannel) => addedChannel.url === url);
      let channel;

      if (existingChannel) {
        channel = existingChannel;
      } else {
        channel = parsedData.channel;
        channel.id = genId();
        channel.url = url;
      }

      const news = parsedData.news.map((newsItem) => (
        {
          ...newsItem,
          id: genId(),
          channelId: channel.id,
        }
      ));

      return { channel, news };
    })
    .catch((e) => {
      if (e.type) {
        throw e;
      } else {
        throw error;
      }
    });
};
