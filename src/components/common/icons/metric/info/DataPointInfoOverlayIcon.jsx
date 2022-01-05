import React from "react";
import PropTypes from "prop-types";
import DataBlockInfoOverlay from "components/common/inputs/metric/DataBlockInfoOverlay";
import {objectHelpers} from "components/common/helpers/object/object.helpers";
import InfoOverlayIcon from "components/common/icons/info/InfoOverlayIcon";

function DataPointInfoOverlayIcon(
  {
    dataPoint,
    title,
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
      className={"light-gray-text-secondary"}
      overlayPlacement={overlayPlacement}
    />
  );
}

DataPointInfoOverlayIcon.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  dataPoint: PropTypes.object,
  overlayPlacement: PropTypes.string,
};

DataPointInfoOverlayIcon.defaultProps = {
  title: "Metric Details",
  overlayPlacement: "right",
};

export default DataPointInfoOverlayIcon;