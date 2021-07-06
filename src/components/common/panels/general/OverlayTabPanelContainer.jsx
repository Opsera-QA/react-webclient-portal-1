import React from "react";
import PropTypes from "prop-types";

function OverlayTabPanelContainer({ tabContainer, currentView }) {
  return (
    <div className={"full-screen-overlay-tab-panel-body-with-buttons"}>
      <div>
          {tabContainer}
      </div>
      <div className="pt-1 full-screen-overlay-tab-panel-inner-body-with-buttons">
        {currentView}
      </div>
    </div>
  );
}

OverlayTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  currentView: PropTypes.any,
};

export default OverlayTabPanelContainer;