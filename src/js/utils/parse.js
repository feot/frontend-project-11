export default (data) => {
  const domParser = new DOMParser();
  const xmlDom = domParser.parseFromString(data, 'text/xml');
  const errorNode = xmlDom.querySelector('parsererror');

  if (errorNode) {
    const error = new Error(errorNode.textContent);
    error.type = 'notRss';
    throw error;
  }

  const feedTitleEl = xmlDom.querySelector('title');
  const feedDescriptionEl = xmlDom.querySelector('description');
  const feedTitle = feedTitleEl.textContent;
  const feedDescription = feedDescriptionEl.textContent;
  const postItems = [...xmlDom.querySelectorAll('item')];
  const posts = postItems.map((item) => {
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
    feed: {
      title: feedTitle,
      description: feedDescription,
    },
    posts,
  };
};
