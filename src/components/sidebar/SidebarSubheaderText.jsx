import React from "react";
import PropTypes from "prop-types";
export default function SidebarSubheaderText(
  {
    isSidebarCollapsed,
    subheaderText,
  }) {
  if (isSidebarCollapsed === true) {
    return null;
  }

  return (
    <div className={"mt-3 mb-2 sub-header"}>
      {subheaderText}
    </div>
  );
}

SidebarSubheaderText.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
  subheaderText: PropTypes.string,
};