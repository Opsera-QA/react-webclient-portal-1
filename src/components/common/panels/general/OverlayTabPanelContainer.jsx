import React from "react";
import PropTypes from "prop-types";

function OverlayTabPanelContainer({ tabContainer, currentView }) {
  return (
    <>
      <div>
          {tabContainer}
      </div>
      <div>
        {currentView}
      </div>
    </>
  );
}

OverlayTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  currentView: PropTypes.any,
};

export default OverlayTabPanelContainer;