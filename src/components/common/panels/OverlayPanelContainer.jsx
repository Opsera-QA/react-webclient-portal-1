import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OverlayPanelContainer({ overlayPanel }) {
  const [currentOverlayPanel, setCurrentOverlayPanel] = useState(undefined);

  useEffect(() => {
    setCurrentOverlayPanel(overlayPanel);
  }, [overlayPanel]);

  if (currentOverlayPanel == null) {
    return null;
  }

  return (currentOverlayPanel);
}

OverlayPanelContainer.propTypes = {
  overlayPanel: PropTypes.object,
};

export default OverlayPanelContainer;