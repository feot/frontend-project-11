export default (data) => {
  const domParser = new DOMParser();
  const xmlDom = domParser.parseFromString(data, 'text/xml');
  const channelTitleEl = xmlDom.querySelector('title');
  const channelDescriptionEl = xmlDom.querySelector('description');
  const channelTitle = channelTitleEl.textContent;
  const channelDescription = channelDescriptionEl.textContent;
  const newsItems = [...xmlDom.querySelectorAll('item')];
  const news = newsItems.map((item) => {
    const titleEl = item.querySelector('title');
    const descriptionEl = item.querySelector('description');
    const linkEl = item.querySelector('link');
    const title = titleEl.textContent;
    const description = descriptionEl.textContent;
    const link = linkEl.textContent;

    return {
      title,
      description,
      link,
    };
  });

  return {
    channel: {
      title: channelTitle,
      description: channelDescription,
    },
    news,
  };
};
