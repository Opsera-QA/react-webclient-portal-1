import React from "react";
import PropTypes from "prop-types";

function CustomTabContainer({children, styling}) {
  return (
    <div className={styling}>
      <ul className="nav nav-tabs">
        {children}
      </ul>
    </div>
  );
}

CustomTabContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styling: PropTypes.string
};

CustomTabContainer.defaultProps = {
  styling: "default-custom-tabs"
};

export default CustomTabContainer;