import React  from "react";
import PropTypes from "prop-types";

function SummaryActionBarContainer({ children }) {
  return (
    <div className="text-muted action-bar justify-content-between d-flex pb-2">
      {children}
    </div>
  );
}

SummaryActionBarContainer.propTypes = {
  children: PropTypes.any
};

export default SummaryActionBarContainer;