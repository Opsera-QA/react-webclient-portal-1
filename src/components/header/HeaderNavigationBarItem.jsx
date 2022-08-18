import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";

export default function HeaderNavigationBarItem(
  {
    currentScreen,
    setCurrentScreen,
    screenName,
    screenLabel,
    className,
  }) {
  return (
    <Nav.Item
      className={className}
      onClickFunction={() => setCurrentScreen(screenName)}
    >
      <div className={currentScreen === screenName ? "font-weight-bold my-auto" : ""}>
        {screenLabel}
      </div>
      <div className={currentScreen === screenName ? "w-100 mt-auto active-header-underline" : ""} />
    </Nav.Item>
  );
}

HeaderNavigationBarItem.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  screenName: PropTypes.string,
  screenLabel: PropTypes.string,
  className: PropTypes.string,
};

HeaderNavigationBarItem.defaultProps = {
  className: "mx-5",
};
