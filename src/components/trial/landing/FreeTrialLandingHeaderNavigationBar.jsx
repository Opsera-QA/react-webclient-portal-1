import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import useLocationReference from "hooks/useLocationReference";

const FREE_TRIAL_LANDING_SCREENS = {
  HOME: "home",
  WORKSPACE: "workspace",
  UNIFIED_INSIGHTS: "insights",
};

export default function FreeTrialLandingHeaderNavigationBar(
  {
    currentScreen,
  }) {
  const history = useHistory();
  const {
    currentPath,
  } = useLocationReference();
  const {
    themeConstants,
  } = useComponentStateReference();

  const handleScreenClick = (newScreen) => {
    switch (newScreen) {
      case FREE_TRIAL_LANDING_SCREENS.HOME:
        if (currentPath !== "/") {
          history.push("/");
        }
        break;
      case FREE_TRIAL_LANDING_SCREENS.WORKSPACE:
        if (currentPath !== "/workspace") {
          history.push("/workspace");
        }
        break;
      case FREE_TRIAL_LANDING_SCREENS.UNIFIED_INSIGHTS:
        if (currentPath !== "/unified-insights") {
          history.push("/unified-insights");
        }
        break;
    }
  };

  return (
    <Navbar.Collapse className={"h-100 justify-content-between d-flex mx-5"}>
      <HeaderNavigationBarItem
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Home"}
        screenName={"home"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/"}
      />
      <HeaderNavigationBarItem
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Workspace"}
        screenName={"workspace"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/workspace"}
      />
      <HeaderNavigationBarItem
        className={"no-wrap d-none d-lg-inline"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Unified Insights"}
        screenName={"insights"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/"}
      />
      <HeaderNavigationBarItem
        className={"d-inline d-lg-none"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Insights"}
        screenName={"insights"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/unified-insights"}
      />
    </Navbar.Collapse>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
};
