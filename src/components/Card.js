import React from "react";

const Card = ({ post }) => (
  <div className="flex flex-wrap bg-white sm:flex-nowrap my-4 p-4 border-solid border border-gray-100 rounded-md shadow">
    {post.thumbnail && post.thumbnail.includes("https") ? (
      <div className="flex-fw sm:flex-initial sm:flex-shrink-0 sm:mr-4 mb-4 sm:mb-0">
        <img className="mx-auto" src={post.thumbnail} alt="preview thumbnail" />
      </div>
    ) : null}
    <div className="flex flex-col flex-fw sm:flex-auto sm:flex-grow">
      <h2
        className={`${
          post.type === "link"
            ? "text-xl sm:text-3xl font-semibold"
            : "text-base sm:text-lg font-bold uppercase"
        }`}
        dangerouslySetInnerHTML={{ __html: post.title }}
      ></h2>
      <span className="block text-sm font-bold mb-2">{`r/${post.subreddit}`}</span>
      {post.content ? (
        <div
          className="markdown-wrapper mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      ) : null}
      <div className="flex items-end flex-grow text-sm sm:text-base">
        <a
          className="py-2 px-4 bg-orange hover:bg-orange-light text-white font-bold rounded"
          href={`https://www.reddit.com${post.permalink}`}
        >
          View on Reddit
        </a>
        {post.url && !post.url.includes(post.permalink) ? (
          <a
            className="py-1.5 px-4 ml-3 border-2 border-orange hover:border-orange-light hover:bg-orange-light text-orange hover:text-white font-bold rounded"
            href={post.url}
          >
            External Link
          </a>
        ) : null}
      </div>
    </div>
  </div>
);

export default Card;
