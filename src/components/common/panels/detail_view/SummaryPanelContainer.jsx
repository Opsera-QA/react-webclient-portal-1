import React from "react";
import PropTypes from "prop-types";

function SummaryPanelContainer({ summaryActionBar, children }) {
  return (
    <div className="scroll-y pt-2 px-3">
      {summaryActionBar}
      <div className="mb-3 shaded-panel p-3 detail-view-summary">
        {children}
      </div>
    </div>
  );
}


SummaryPanelContainer.propTypes = {
  summaryActionBar: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SummaryPanelContainer;