import React  from "react";
import PropTypes from "prop-types";

function ActionBarContainer({ children }) {
  return (
    <div className="text-muted justify-content-between shaded-container d-flex px-3">
      {children}
    </div>
  );
}

ActionBarContainer.propTypes = {
  children: PropTypes.any
};

export default ActionBarContainer;