import React, {useEffect} from "react";
import { Navbar } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import useLocationReference from "hooks/useLocationReference";

const HEADER_NAVIGATION_SCREENS = {
  HOME: "home",
  WORKSPACE: "workspace",
  UNIFIED_INSIGHTS: "insights",
};

export default function LandingHeaderNavigationBar() {
  const history = useHistory();
  const {
    currentPath,
    isPublicPathState
  } = useLocationReference();
  const {
    themeConstants,
    userData,
  } = useComponentStateReference();

  useEffect(() => {}, [currentPath]);

  const handleScreenClick = (newScreen) => {
    switch (newScreen) {
      case HEADER_NAVIGATION_SCREENS.HOME:
        if (currentPath !== "/") {
          history.push("/");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.WORKSPACE:
        if (currentPath !== "/workspace") {
          history.push("/workspace");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS:
        if (currentPath !== "/unified-insights") {
          history.push("/unified-insights");
        }
        break;
    }
  };

  if (!userData || isPublicPathState === true) {
    return null;
  }

  return (
    <Navbar.Collapse className={"h-100 justify-content-between d-flex mx-5"}>
      <HeaderNavigationBarItem
        currentScreen={currentPath === "/" ? HEADER_NAVIGATION_SCREENS.HOME : undefined}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Home"}
        screenName={HEADER_NAVIGATION_SCREENS.HOME}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/"}
      />
      <HeaderNavigationBarItem
        currentScreen={currentPath?.startsWith("/workspace") ? HEADER_NAVIGATION_SCREENS.WORKSPACE : undefined}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Workspace"}
        screenName={"workspace"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath?.startsWith("/workspace") === true}
      />
      <HeaderNavigationBarItem
        className={"no-wrap d-none d-lg-inline"}
        currentScreen={currentPath?.startsWith("/unified-insights") ? HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS : undefined}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Unified Insights"}
        screenName={"insights"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath?.startsWith("/unified-insights") === true}
      />
      <HeaderNavigationBarItem
        className={"d-inline d-lg-none"}
        currentScreen={currentPath?.startsWith("/unified-insights") ? HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS : undefined}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Insights"}
        screenName={"insights"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath?.startsWith("/unified-insights") === true}
      />
    </Navbar.Collapse>
  );
}

