import React  from "react";
import PropTypes from "prop-types";

function ActionBarContainer({ children }) {
  return (
    <div className="justify-content-between d-flex px-3 py-2">
      {children}
    </div>
  );
}

ActionBarContainer.propTypes = {
  children: PropTypes.any
};

export default ActionBarContainer;