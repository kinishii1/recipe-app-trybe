export const formatUrl = (url: string) => {
  const newUrl = url.replace('watch?v=', 'embed/');
  return newUrl;
};
