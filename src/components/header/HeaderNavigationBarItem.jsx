import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import useComponentStateReference from "hooks/useComponentStateReference";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import { mouseHelper } from "temp-library-components/helpers/mouse.helper";

export default function HeaderNavigationBarItem(
  {
    currentScreen,
    setCurrentScreen,
    screenName,
    screenLabel,
    className,
    disabled,
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
      <div className={"d-flex"}>
        <div
          className={currentScreen === screenName ? "font-weight-bold align-self-center" : "align-self-center"}
        >
          {screenLabel}
        </div>
        {/*{getCurrentScreenUnderline()}*/}
      </div>
    );
  };

  const getStyling = () => {
    if (currentScreen === screenName) {
      return (
        {
          fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          fontWeight: 800,
          fontSize: "16px",
          cursor: mouseHelper.getLinkMousePointer(setCurrentScreen, disabled, currentScreen === screenName),
        }
      );
    }

    return (
      {
        cursor: mouseHelper.getMouseCursor(setCurrentScreen, disabled),
        fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
        fontWeight: 500,
        fontSize: "16px",
      }
    );
  };

  return (
    <div className={className}>
      <div
        className={"mx-5 h-100 w-100 d-flex flex-column"}
        onClick={() => setCurrentScreen(screenName)}
        style={getStyling()}
      >
        <Nav.Item className={"h-100 w-100 d-flex"}>
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
};