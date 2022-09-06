import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import useComponentStateReference from "hooks/useComponentStateReference";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";

export default function HeaderNavigationBarItem(
  {
    currentScreen,
    setCurrentScreen,
    screenName,
    screenLabel,
    className,
    disabled,
    fontColor,
    disableMousePointer,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getScreenLabel = () => {
    return (
      <div
        className={currentScreen === screenName ? "font-weight-bold align-self-center" : "align-self-center"}
      >
        {screenLabel}
      </div>
    );
  };

  //setting most of the font configs by css, only color and weight need ot change
  const getStyling = () => {
    if (currentScreen === screenName) {
      return (
        {
          color: themeConstants.COLOR_PALETTE.OPSERA_GOLD, //fontColor,
          fontWeight: 300,
          // borderBottom: `1px solid ${themeConstants.COLOR_PALETTE.OPSERA_GOLD}`,
          cursor: mouseHelper.getLinkMousePointer(setCurrentScreen, disabled, disableMousePointer),
        }
      );
    }

    return (
      {
        cursor: mouseHelper.getMouseCursor(setCurrentScreen, disabled),
      }
    );
  };

  return (
    <div className={className}>
      <div
        className={"mx-5 h-100 d-flex flex-column topNavLinkText"}
        onClick={() => setCurrentScreen(screenName)}
        style={getStyling()}
      >
        <Nav.Item>
          {getScreenLabel()}
        </Nav.Item>
      </div>
    </div>
  );
}

HeaderNavigationBarItem.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  screenName: PropTypes.string,
  screenLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fontColor: PropTypes.string,
  disableMousePointer: PropTypes.bool,
};