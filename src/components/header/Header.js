import React, { useState, useLayoutEffect } from "react";
import LoginHeader from "./LoginHeader";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useSelector } from "react-redux";

const MOBILE_BREAKPOINT = 768;
const isMobileBreakpoint = () => window.innerWidth < MOBILE_BREAKPOINT;

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(isMobileBreakpoint());

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
    <LoginHeader />
  ) : isMobile ? (
    <MobileHeader />
  ) : (
    <DesktopHeader username={user.username} />
  );
};

export default Header;
