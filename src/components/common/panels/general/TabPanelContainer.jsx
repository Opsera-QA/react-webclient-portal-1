import React from "react";
import PropTypes from "prop-types";

function TabPanelContainer({ tabContainer, currentView }) {
  return (
    <div>
      <div>
          {tabContainer}
      </div>
      <div className="shaded-panel detail-panel-body">
        <div className="pt-2 px-3">{currentView}</div>
      </div>
    </div>
  );
}


TabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  currentView: PropTypes.object,
};

export default TabPanelContainer;