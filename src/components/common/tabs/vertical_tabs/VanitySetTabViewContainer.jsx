import React from "react";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";

function VanitySetTabViewContainer({children, className}) {
  return (
    <div className={className}>
      <Tab.Content>
        {children}
      </Tab.Content>
    </div>
  );
}

VanitySetTabViewContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
};

export default VanitySetTabViewContainer;