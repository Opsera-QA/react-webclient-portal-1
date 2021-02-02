import React from "react";
import PropTypes from "prop-types";

function NavigationTabContainer({children, styling}) {
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
  styling: "sub-navigation-tabs"
};

export default NavigationTabContainer;