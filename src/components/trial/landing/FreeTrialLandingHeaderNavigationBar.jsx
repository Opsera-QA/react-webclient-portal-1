import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";
import HeaderNavigationBarItemDivider from "components/header/navigation_bar/HeaderNavigationBarItemDivider";
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
    <Navbar.Collapse className={"h-100 darkBackgroundText"}>
      <HeaderNavigationBarItem
        className={"ml-5 mr-1"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Home"}
        screenName={"home"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/"}
      />
      <HeaderNavigationBarItem
        className={"mr-1"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Workspace"}
        screenName={"workspace"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
        disableMousePointer={currentPath === "/workspace"}
      />
      <span className={"d-none d-lg-inline"}>
        <HeaderNavigationBarItem
          className={"mr-1 no-wrap "}
          currentScreen={currentScreen}
          setCurrentScreen={handleScreenClick}
          screenLabel={"Unified Insights"}
          screenName={"insights"}
          disableMousePointer={currentPath === "/"}
        />
      </span>
      <span className={"d-inline d-lg-none"}>
        <HeaderNavigationBarItem
          className={"mr-1"}
          currentScreen={currentScreen}
          setCurrentScreen={handleScreenClick}
          screenLabel={"Insights"}
          screenName={"insights"}
          disableMousePointer={currentPath === "/unified-insights"}
        />
      </span>
    </Navbar.Collapse>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
};
