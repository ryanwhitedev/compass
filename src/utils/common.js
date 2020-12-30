export const getUrlParams = () => {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  return Array.from(params).reduce((acc, param) => {
    const [key, value] = param;
    acc[key] = value;
    return acc;
  }, {});
};
