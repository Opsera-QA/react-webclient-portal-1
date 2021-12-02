import React from "react";
import PropTypes from "prop-types";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";
import DataBlockInfoOverlay from "components/common/inputs/metric/DataBlockInfoOverlay";

function DataBlockInfoOverlayIcon(
  {
    dataBlockInfoPanel,
    dataPoint,
    title,
    className,
    overlayPlacement,
  }) {
  const getInfoOverlay = () => {
    if ((dataPoint == null || typeof dataPoint !== "object") && dataBlockInfoPanel == null) {
      return null;
    }

    return (
      <DataBlockInfoOverlay
        dataPoint={dataPoint}
        dataBlockInfoPanel={dataBlockInfoPanel}
      />
    );
  };

  return (
    <HelpInfoOverlayIcon
      title={title}
      infoOverlay={getInfoOverlay()}
      className={className}
      overlayPlacement={overlayPlacement}
    />
  );
}

DataBlockInfoOverlayIcon.propTypes = {
  dataBlockInfoPanel: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  dataPoint: PropTypes.object,
  overlayPlacement: PropTypes.string,
};

DataBlockInfoOverlayIcon.defaultProps = {
  title: "Metric Details",
  overlayPlacement: "right",
};

export default DataBlockInfoOverlayIcon;