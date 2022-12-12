import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

// TODO: When sidebar is updated to use this for everything,
//  remove menu-text class and space in span and use bootstrap classes.
export default function SidebarNavigationLinkBase(
  {
    icon,
    link,
    label,
    exact,
  }) {
  return (
    <NavLink
      className={"nav-link"}
      activeClassName={"chosen"}
      to={link}
      exact={exact}
    >
      <IconBase iconSize={"lg"} icon={icon} />
      <span className="menu-text"> {label}</span>
    </NavLink>
  );
}

SidebarNavigationLinkBase.propTypes = {
  icon: PropTypes.object,
  link: PropTypes.string,
  label: PropTypes.string,
  exact: PropTypes.bool,
};
