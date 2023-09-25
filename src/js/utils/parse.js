import genId from './genId.js';

export default (data) => {
  const domParser = new DOMParser();
  const xmlDom = domParser.parseFromString(data, 'text/xml');
  const channelTitleEl = xmlDom.querySelector('title');
  const channelDescriptionEl = xmlDom.querySelector('description');
  const channelTitle = channelTitleEl.textContent;
  const channelDescription = channelDescriptionEl.textContent;
  const channelId = genId();
  const newsItems = [...xmlDom.querySelectorAll('item')];
  const news = newsItems.map((item) => {
    const titleEl = item.querySelector('title');
    const descriptionEl = item.querySelector('description');
    const linkEl = item.querySelector('link');
    const title = titleEl.textContent;
    const description = descriptionEl.textContent;
    const link = linkEl.textContent;
    const id = genId();

    return {
      id,
      channelId,
      title,
      description,
      link,
    };
  });

  return {
    channel: {
      id: channelId,
      title: channelTitle,
      description: channelDescription,
    },
    news,
  };
};
