import React, { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useSelector } from "react-redux";
import { authenticateUserWithAction } from "../../services/auth";
import useSearch from "../../hooks/useSearch";
import {
  setSearch,
  clearSearch,
  setAction,
  clearUser,
  clearPosts,
} from "../../utils/actionCreators";
import storage from "../../utils/storage";

const MOBILE_BREAKPOINT = 768;
const isMobileBreakpoint = () => window.innerWidth < MOBILE_BREAKPOINT;

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(isMobileBreakpoint());

  const search = useSearch();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchPosts = (query) => {
    if (!query) {
      dispatch(clearSearch());
      history.push("/");
    } else {
      const results = search(query);
      dispatch(setSearch({ query, results }));
      history.push(`?s=${encodeURIComponent(query)}`);
    }
  };

  const loadPosts = (toggleFn) => (loadOp) => {
    dispatch(setAction(loadOp));
    toggleFn();
  };

  const logout = () => {
    storage.clearUser();
    dispatch(clearUser());
    storage.clearPosts();
    dispatch(clearPosts());
  };

  useLayoutEffect(() => {
    if (user) {
      const changeHeader = () => {
        setIsMobile(isMobileBreakpoint() ? true : false);
      };

      window.addEventListener("resize", changeHeader);
      return () => window.removeEventListener("resize", changeHeader);
    }
  });

  return !(user && user.username) ? (
    <LoginHeader login={() => authenticateUserWithAction("getAllPosts")} />
  ) : isMobile ? (
    <MobileHeader
      searchPosts={searchPosts}
      loadPosts={loadPosts}
      logout={logout}
    />
  ) : (
    <DesktopHeader
      username={user.username}
      searchPosts={searchPosts}
      loadPosts={loadPosts}
      logout={logout}
    />
  );
};

export default Header;
