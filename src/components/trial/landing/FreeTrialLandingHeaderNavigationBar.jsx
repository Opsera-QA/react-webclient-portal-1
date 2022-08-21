import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";
import HeaderNavigationBarItemDivider from "components/header/navigation_bar/HeaderNavigationBarItemDivider";

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
          history.push("/");
          break;
      }
    }
  };

  return (
    <Navbar.Collapse className={"h-100 mx-auto"}>
      <HeaderNavigationBarItem
        className={"ml-auto"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Home"}
        screenName={"home"}
      />
      <HeaderNavigationBarItemDivider />
      <HeaderNavigationBarItem
        className={"mr-auto"}
        currentScreen={currentScreen}
        setCurrentScreen={handleScreenClick}
        screenLabel={"Workspace"}
        screenName={"workspace"}
      />
      {/*<HeaderNavigationBarItem*/}
      {/*  className={"mx-5"}*/}
      {/*  currentScreen={currentScreen}*/}
      {/*  setCurrentScreen={handleScreenClick}*/}
      {/*  screenLabel={"Unified Insights"}*/}
      {/*  screenName={"insights"}*/}
      {/*/>*/}
    </Navbar.Collapse>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
};
