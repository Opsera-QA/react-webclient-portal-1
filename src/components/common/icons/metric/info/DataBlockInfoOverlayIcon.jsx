import React from "react";
import PropTypes from "prop-types";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";
import DataBlockInfoOverlay from "components/common/inputs/metric/DataBlockInfoOverlay";
import {objectHelpers} from "components/common/helpers/object/object.helpers";
import InfoOverlayIcon from "components/common/icons/info/InfoOverlayIcon";

function DataBlockInfoOverlayIcon(
  {
    dataPoint,
    title,
    className,
    overlayPlacement,
  }) {
  const getInfoOverlay = () => {
    if (objectHelpers.isObject(dataPoint) !== true) {
      return null;
    }

    return (
      <DataBlockInfoOverlay
        dataPoint={dataPoint}
      />
    );
  };

  return (
    <InfoOverlayIcon
      title={title}
      infoOverlay={getInfoOverlay()}
      className={className}
      overlayPlacement={overlayPlacement}
    />
  );
}

DataBlockInfoOverlayIcon.propTypes = {
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