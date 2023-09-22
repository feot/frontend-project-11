import genId from './genId.js';

export default (data) => {
  const domParser = new DOMParser();
  const xmlDom = domParser.parseFromString(data, 'text/xml');
  const rssTitleEl = xmlDom.querySelector('title');
  const rssDescriptionEl = xmlDom.querySelector('description');
  const rssTitle = rssTitleEl.textContent;
  const rssDescription = rssDescriptionEl.textContent;
  const rssId = genId();
  const newsItems = [...xmlDom.querySelectorAll('item')];
  const news = newsItems.map((item) => {
    const titleEl = item.querySelector('title');
    const descriptionEl = item.querySelector('description');
    const linkEl = item.querySelector('link');
    const title = titleEl.textContent;
    const description = descriptionEl.textContent;
    const link = linkEl.textContent;

    return {
      rssId,
      title,
      description,
      link,
    };
  });

  return {
    id: rssId,
    title: rssTitle,
    description: rssDescription,
    news,
  };
};
