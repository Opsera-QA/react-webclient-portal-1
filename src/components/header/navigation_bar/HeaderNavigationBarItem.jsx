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
  }) {
  const { themeConstants } = useComponentStateReference();

  const getCurrentScreenUnderline = () => {
    if (currentScreen === screenName) {
      return (
        <div
          className={"w-100 align-self-end"}
          style={{
            backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
            height: "3px",
          }}
        />
      );
    }
  };

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
          // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          fontWeight: 300,
          borderBottom: `1px solid ${themeConstants.COLOR_PALETTE.OPSERA_GOLD}`,
          //fontSize: "16px",
          //letterSpacing: "0.25rem",
          cursor: mouseHelper.getLinkMousePointer(setCurrentScreen, disabled, currentScreen === screenName),
        }
      );
    }

    return (
      {
        //color: fontColor,
        cursor: mouseHelper.getMouseCursor(setCurrentScreen, disabled),
        // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
        // letterSpacing: "0.25rem",
        //fontWeight: undefined,
        //fontSize: "16px",
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
};