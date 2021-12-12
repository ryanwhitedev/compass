export const getUrlParams = () => {
  const search = window.location.search.substring(1);
  if (!search) return null;

  const params = new URLSearchParams(search);
  return Array.from(params).reduce((acc, param) => {
    const [key, value] = param;
    acc[key] = value;
    return acc;
  }, {});
};

export const generateToken = (length, action) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let token = "";
  while (token.length < length) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return `${token}__${action}`;
};

export const parseStateToken = (token) => {
  return token.split("__")[1];
};
