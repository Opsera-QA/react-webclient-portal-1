import React from "react";
import PropTypes from "prop-types";
import InfoOverlayIcon from "components/common/icons/general/InfoOverlayIcon";
import DataBlockInfoOverlay from "components/common/inputs/metric/DataBlockInfoOverlay";

function DataBlockInfoOverlayIcon({dataBlockInfoPanel, dataPoint, title, className}) {
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
    <InfoOverlayIcon
      title={title}
      infoOverlay={getInfoOverlay()}
      className={className}
    />
  );
}

DataBlockInfoOverlayIcon.propTypes = {
  dataBlockInfoPanel: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default DataBlockInfoOverlayIcon;