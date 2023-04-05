import React from "react";
import PropTypes from "prop-types";
import SubMenuBodyBase from "temp-library-components/navigation/sub_menu/SubMenuBodyBase";

export default function SubMenuContainer(
  {
    children,
    className,
  }) {
  if (children == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"sub-menu-container"}>
        <SubMenuBodyBase>
          {children}
        </SubMenuBodyBase>
      </div>
    </div>
  );
}

SubMenuContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
