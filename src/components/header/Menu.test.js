import React from "react";
import { render, fireEvent } from "../../testUtils";
import Menu from "./Menu";

describe("<Menu />", () => {
  test("load new posts called with proper argument", () => {
    const mockHandler = jest.fn();
    const menu = render(<Menu loadPosts={mockHandler} logout={() => {}} />);

    const button = menu.getByText("Load New Posts");
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe("getNewPosts");
  });

  test("load all posts called with proper argument", () => {
    const mockHandler = jest.fn();
    const menu = render(<Menu loadPosts={mockHandler} logout={() => {}} />);

    const button = menu.getByText("Reload All Posts");
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe("getAllPosts");
  });
});
