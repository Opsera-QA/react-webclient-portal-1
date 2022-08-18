import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import HeaderNavigationBarItem from "components/header/HeaderNavigationBarItem";

export default function FreeTrialLandingHeaderNavigationBar(
  {
    currentScreen,
    setCurrentScreen,
  }) {
  return (
    <Navbar.Collapse id={"basic-navbar-nav"}>
      <HeaderNavigationBarItem
        className={"mx-5"}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        screenLabel={"Home"}
        screenName={"home"}
      />
      <HeaderNavigationBarItem
        className={"mx-5"}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        screenLabel={"Workspace"}
        screenName={"workspace"}
      />
      <HeaderNavigationBarItem
        className={"mx-5"}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        screenLabel={"Unified Insights"}
        screenName={"insights"}
      />
    </Navbar.Collapse>
  );
}

FreeTrialLandingHeaderNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};
