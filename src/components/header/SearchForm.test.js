import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "../../testUtils";
import SearchForm from "./SearchForm";

describe("<SearchForm />", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });

  test("search function called with proper arguments", () => {
    history.push("/");
    const mockHandler = jest.fn();
    const component = render(
      <Router history={history}>
        <SearchForm searchPosts={mockHandler} />
      </Router>
    );

    const searchInput = component.container.querySelector("input");
    fireEvent.change(searchInput, { target: { value: "test search query" } });
    const searchForm = component.container.querySelector("form");
    fireEvent.submit(searchForm);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe("test search query");
  });

  test("search function called if a search query is in the url's search parameters", () => {
    history.push("?s=test%20search%20query");
    const mockHandler = jest.fn();
    const component = render(
      <Router history={history}>
        <SearchForm searchPosts={mockHandler} />
      </Router>
    );

    const searchInput = component.container.querySelector("input");
    expect(searchInput).toHaveValue("test search query");

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe("test search query");
  });
});
