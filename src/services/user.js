export const getUserData = async (token, tokenType = "bearer") => {
  const endpoint = "https://oauth.reddit.com/api/v1/me?raw_json=1";
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
};

const getSavedPosts = async ({
  user,
  limit = 100,
  before = null,
  after = null,
  count = 0,
}) => {
  const { accessToken, tokenType, username } = user;
  let endpoint = `https://oauth.reddit.com/user/${username}/saved?limit=${limit}`;
  if (before) {
    endpoint += `&before=${before}`;
  }
  if (after) {
    endpoint += `&after=${after}`;
  }
  if (count) {
    endpoint += `&count=${count}`;
  }

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });
  return response.json();
};

export const getAllUserSavedPosts = async (user) => {
  let currentPostId = null;
  const savedPosts = [];

  do {
    const response = await getSavedPosts({
      user,
      after: currentPostId,
      count: savedPosts.length,
    });
    savedPosts.push(...response.data.children);
    currentPostId = response.data.after;
  } while (currentPostId);

  return savedPosts;
};
