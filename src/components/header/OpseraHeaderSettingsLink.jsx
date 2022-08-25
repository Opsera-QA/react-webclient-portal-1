import React from "react";
import { Navbar } from "react-bootstrap";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useLocation, useHistory } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { faCogs } from "@fortawesome/pro-light-svg-icons";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";

const HEADER_SETTINGS_LINK = "/trial/settings";

export default function OpseraHeaderSettingsLink() {
  const {
    isOpseraAdministrator,
    themeConstants,
  } = useComponentStateReference();
  const currentPath = useLocation()?.pathname;
  const history = useHistory();

  const handleLink = () => {
    if (currentPath !== HEADER_SETTINGS_LINK) {
      history.push(HEADER_SETTINGS_LINK);
    }
  };

  const getSettingsIcon = () => {
    return (
      <IconBase
        icon={faCogs}
        iconSize={"xl"}
        className={"mr-2"}
        iconStyling={{
          // borderRadius: "38px",
          color: themeConstants.COLOR_PALETTE.WHITE,
        }}
      />
    );
  };

  const getStyling = () => {
    if (currentPath === HEADER_SETTINGS_LINK) {
      return (
        {
          color: themeConstants.COLOR_PALETTE.WHITE,
          // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          // fontWeight: 800,
          // fontSize: "16px",
          // letterSpacing: "0.25rem",
          cursor: mouseHelper.getLinkMousePointer(handleLink, null, currentPath === HEADER_SETTINGS_LINK),
        }
      );
    }

    return (
      {
        color: themeConstants.COLOR_PALETTE.WHITE,
        cursor: mouseHelper.getMouseCursor(handleLink),
        // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
        // letterSpacing: "0.25rem",
        // fontWeight: 500,
        // fontSize: "16px",
      }
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <Navbar.Collapse id={"basic-navbar-nav"}>
      <span
        className={"mx-2"}
        style={getStyling()}
        onClick={handleLink}
      >
        {getSettingsIcon()}
        Settings
      </span>
    </Navbar.Collapse>
  );
}

OpseraHeaderSettingsLink.propTypes = {};
