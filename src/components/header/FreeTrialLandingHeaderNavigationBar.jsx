import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/HeaderNavigationBarItem";
import { useHistory } from "react-router-dom";

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
    <div
      style={{
        height: "88px",
      }}
    >
      <Navbar.Collapse className={"h-100"}>
        <HeaderNavigationBarItem
          className={"mx-5"}
          currentScreen={currentScreen}
          setCurrentScreen={handleScreenClick}
          screenLabel={"Home"}
          screenName={"home"}
        />
        <HeaderNavigationBarItem
          className={"mx-5"}
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
    </div>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
};
