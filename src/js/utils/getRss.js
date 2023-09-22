export default (url) => {
  const requestUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  const error = new Error();
  error.type = 'network';

  return fetch(requestUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw error;
    })
    .then((data) => {
      const { content_type: contentType } = data.status;

      if (contentType.startsWith('application/rss+xml; charset=utf-8')) {
        return data.contents;
      }
      error.type = 'notRss';
      throw error;
    })
    .catch(() => {
      throw error;
    });
};
