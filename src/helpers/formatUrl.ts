export const formatUrl = (url: string) => {
  if (!url) return '';
  const newUrl = url.replace('watch?v=', 'embed/');
  return newUrl;
};
