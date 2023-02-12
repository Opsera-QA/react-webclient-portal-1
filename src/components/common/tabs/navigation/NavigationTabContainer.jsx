import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function NavigationTabContainer({children, styling}) {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  // This is hidden on free trial for users besides opsera administrators
  if (isFreeTrial === true && isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <div className={styling}>
      <ul className="nav nav-tabs">
        {children}
      </ul>
    </div>
  );
}

NavigationTabContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styling: PropTypes.string
};

NavigationTabContainer.defaultProps = {
  styling: "sub-navigation"
};