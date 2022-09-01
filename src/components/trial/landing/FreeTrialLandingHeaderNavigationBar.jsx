import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";
import HeaderNavigationBarItemDivider from "components/header/navigation_bar/HeaderNavigationBarItemDivider";
import useComponentStateReference from "hooks/useComponentStateReference";

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
    themeConstants,
  } = useComponentStateReference();

  const handleScreenClick = (newScreen) => {
    if (currentScreen !== newScreen) {
      switch (newScreen) {
        case FREE_TRIAL_LANDING_SCREENS.HOME:
          history.push("/");
          break;
        case FREE_TRIAL_LANDING_SCREENS.WORKSPACE:
          history.push("/workspace");
          break;
        case FREE_TRIAL_LANDING_SCREENS.UNIFIED_INSIGHTS:
          history.push("/unified-insights");
          break;
      }
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
      />
      {/*<HeaderNavigationBarItemDivider className={"mr-1"} />*/}
      <HeaderNavigationBarItem
        className={"mr-1"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Workspace"}
        screenName={"workspace"}
        fontColor={themeConstants.COLOR_PALETTE.WHITE}
      />
      {/*<HeaderNavigationBarItemDivider className={"mr-1"} />*/}
      {/* Narrow screens vs wide ...*/}
      <span className={"d-none d-lg-inline"}>
        <HeaderNavigationBarItem
          className={"mr-1 no-wrap "}
          currentScreen={currentScreen}
          setCurrentScreen={handleScreenClick}
          screenLabel={"Unified Insights"}
          screenName={"insights"}
        />
      </span>

      <span className={"d-inline d-lg-none"}>
        <HeaderNavigationBarItem
          className={"mr-1"}
          currentScreen={currentScreen}
          setCurrentScreen={handleScreenClick}
          screenLabel={"Insights"}
          screenName={"insights"}
        />
      </span>
    </Navbar.Collapse>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
};
