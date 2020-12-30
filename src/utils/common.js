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

export const generateToken = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let token = "";
  while (token.length < length) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
};
