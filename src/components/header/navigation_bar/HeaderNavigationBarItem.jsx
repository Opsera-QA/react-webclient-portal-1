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

  const getStyling = () => {
    const styling = {
      cursor: mouseHelper.getMouseCursor(setCurrentScreen, disabled),
      fontSize: "1rem",
      letterSpacing: ".8px",
      fontFamily: fontThemeConstants.FONT_FAMILIES.MAIN_SITE_FONT_FAMILIES,
      color: themeConstants.COLOR_PALETTE.WHITE,
    };

    if (currentScreen === screenName) {
      styling.color = themeConstants.COLOR_PALETTE.OPSERA_GOLD;
      styling.fontWeight = 300;
      // styling.borderBottom = `1px solid ${themeConstants.COLOR_PALETTE.OPSERA_GOLD}`;
      styling.cursor = mouseHelper.getLinkMousePointer(setCurrentScreen, disabled, disableMousePointer);
    }

    return styling;
  };

  return (
    <div className={className}>
      <div
        className={"mx-5 h-100 d-flex flex-columns"}
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
  disableMousePointer: PropTypes.bool,
};