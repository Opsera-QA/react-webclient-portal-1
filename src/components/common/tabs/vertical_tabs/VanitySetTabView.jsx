import React from "react";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";

function VanitySetTabView({children, className, tabKey}) {
  return (
    <Tab.Pane className={className} eventKey={tabKey}>
      {children}
    </Tab.Pane>
  );
}

VanitySetTabView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  tabKey: PropTypes.any,
};

VanitySetTabView.defaultProps = {
  className: "makeup-container-content-body",
};

export default VanitySetTabView;