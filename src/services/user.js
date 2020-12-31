import { sanitize } from "dompurify";
import marked from "marked";

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
    const posts = parseSavedPosts(response.data.children);
    savedPosts.push(...posts);
    currentPostId = response.data.after;
  } while (currentPostId);

  return savedPosts;
};

const parseSavedPosts = (posts) => {
  return posts.map((post) => {
    const type = post.kind === "t1" ? "comment" : "link";
    const title = type === "link" ? post.data.title : post.data.link_title;
    const content =
      type === "comment" && typeof post.data.body !== "undefined"
        ? post.data.body
        : type === "link" && typeof post.data.selftext !== "undefined"
        ? post.data.selftext
        : null;

    return {
      type,
      title: sanitize(marked.parseInline(title), {
        USE_PROFILES: { html: true },
      }),
      content: sanitize(marked(content), { USE_PROFILES: { html: true } }),
      id: post.data.name,
      subreddit: post.data.subreddit_name_prefixed,
      permalink: post.data.permalink,
      url: type === "link" ? post.data.url : null,
      thumbnail: type === "link" ? post.data.thumbnail : null,
    };
  });
};
