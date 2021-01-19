import React from "react";
import { render, fireEvent, screen } from "../testUtils";
import Main from "./Main";

const mockPosts = [
  { type: "comment", title: "Test comment 1", id: "tc__1" },
  { type: "comment", title: "Test comment 2", id: "tc__2" },
  { type: "comment", title: "Test comment 3", id: "tc__3" },
  { type: "comment", title: "Test comment 4", id: "tc__4" },
  { type: "comment", title: "Test comment 5", id: "tc__5" },
  { type: "comment", title: "Test comment 6", id: "tc__6" },
  { type: "comment", title: "Test comment 7", id: "tc__7" },
  { type: "comment", title: "Test comment 8", id: "tc__8" },
  { type: "comment", title: "Test comment 9", id: "tc__9" },
  { type: "comment", title: "Test comment 10", id: "tc__10" },
  { type: "link", title: "Test link 1", id: "tl__1" },
  { type: "link", title: "Test link 2", id: "tl__2" },
];

const mockSearchResults = [
  { type: "link", title: "Test link 2", id: "tl__2" },
  { type: "comment", title: "Test comment 2", id: "tc__2" },
];

describe("<Main />", () => {
  test("no posts rendered if posts is empty", () => {
    render(<Main />, { initialState: { posts: [] } });
    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });

  test("renders posts", () => {
    render(<Main />, { initialState: { posts: mockPosts } });
    expect(screen.getByText("Test comment 1")).toBeInTheDocument();
  });

  test("renders first 10 posts if more than 10 exist", () => {
    const posts = render(<Main />, { initialState: { posts: mockPosts } });
    const postContainer = posts.container.querySelector(".postContainer");
    expect(postContainer.children).toHaveLength(10);
  });

  test("click button to render more posts", () => {
    const posts = render(<Main />, { initialState: { posts: mockPosts } });
    const postContainer = posts.container.querySelector(".postContainer");
    expect(postContainer.children).toHaveLength(10);

    const loadMoreButton = posts.getByText("Load More");
    fireEvent.click(loadMoreButton);
    expect(postContainer.children).toHaveLength(12);
  });

  describe("search query is set", () => {
    test("no posts rendered if results list is empty", () => {
      render(<Main />, {
        initialState: {
          posts: mockPosts,
          search: { query: "", results: [] },
        },
      });

      expect(screen.getByText("No posts found.")).toBeInTheDocument();
    });

    test("renders search results", () => {
      const posts = render(<Main />, {
        initialState: {
          posts: mockPosts,
          search: { query: "", results: mockSearchResults },
        },
      });
      const postContainer = posts.container.querySelector(".postContainer");
      expect(postContainer.children).toHaveLength(2);
    });
  });
});
