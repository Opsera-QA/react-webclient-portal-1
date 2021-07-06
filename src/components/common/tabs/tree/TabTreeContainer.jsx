import React from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";

function TabTreeContainer({children, className}) {
  return (
    <CustomTabContainer styling={className}>
      {children}
    </CustomTabContainer>
  );
}

TabTreeContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};


CustomTabContainer.defaultProps = {
  styling: "default-custom-tabs"
};

export default TabTreeContainer;