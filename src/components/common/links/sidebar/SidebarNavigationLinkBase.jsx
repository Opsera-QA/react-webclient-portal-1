import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {hasStringValue} from "components/common/helpers/string-helpers";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

// TODO: When sidebar is updated to use this for everything,
//  remove menu-text class and space in span and use bootstrap classes.
export default function SidebarNavigationLinkBase(
  {
    icon,
    link,
    label,
    exact,
    isSidebarCollapsed,
    className,
    isExternalLink,
  }) {
  const getLabel = () => {
    if (isSidebarCollapsed !== true && hasStringValue(label) === true) {
      return (
        <span className={"ml-2"}>
          {label}
        </span>
      );
    }

    return (
      <div className={"pr-3"} />
    );
  };

  return (
    <div className={className}>
      <NavLink
        className={"nav-link"}
        activeClassName={"chosen"}
        to={isExternalLink === true ? {pathname: link} : link}
        exact={exact}
        target={isExternalLink === true ? "_blank" : undefined}
      >
        <div className={"d-flex"}>
          <OverlayIconBase
            overlayBody={isSidebarCollapsed === true ? label : undefined}
            iconSize={"lg"}
            icon={icon}
          />
          {getLabel()}
        </div>
      </NavLink>
    </div>
  );
}

SidebarNavigationLinkBase.propTypes = {
  icon: PropTypes.object,
  link: PropTypes.string,
  label: PropTypes.string,
  exact: PropTypes.bool,
  isSidebarCollapsed: PropTypes.bool,
  className: PropTypes.string,
  isExternalLink: PropTypes.bool,
};
