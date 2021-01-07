import React, { useState, useLayoutEffect } from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const MOBILE_BREAKPOINT = 640;

const isMobileBreakpoint = () => window.innerWidth < MOBILE_BREAKPOINT;

const Header = () => {
  const [isMobile, setIsMobile] = useState(isMobileBreakpoint());

  useLayoutEffect(() => {
    const changeNav = () => setIsMobile(isMobileBreakpoint() ? true : false);

    window.addEventListener("resize", changeNav);
    return () => window.removeEventListener("resize", changeNav);
  });

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
