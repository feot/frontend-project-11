export default (yup, url, existingUrls) => {
  const schema = yup.string()
    .required()
    .url()
    .notOneOf(existingUrls);

  return schema.validate(url);
};
