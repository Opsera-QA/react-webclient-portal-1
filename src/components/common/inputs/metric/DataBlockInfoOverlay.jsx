import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer from "components/common/inputs/info_text/InfoOverlayContainer";
import DataPointInfoPanel from "components/common/metrics/panels/strategic_criteria/data_point/DataPointInfoPanel";

function DataBlockInfoOverlay(
  {
    title,
    dataPoint,
    dataBlockInfoPanel,
  }) {
  const getBody = () => {
    return (
      <div>
        {dataBlockInfoPanel}
        <DataPointInfoPanel
          dataPoint={dataPoint}
        />
      </div>
    );
  };

  if ((dataPoint == null || dataPoint !== "object") && dataBlockInfoPanel == null) {
    return null;
  }

  return (
    <InfoOverlayContainer
      title={title}
    >
      {getBody()}
    </InfoOverlayContainer>
  );
}

DataBlockInfoOverlay.propTypes = {
  dataPoint: PropTypes.object,
  dataBlockInfoPanel: PropTypes.any,
  title: PropTypes.string,
};

DataBlockInfoOverlay.defaultProps = {
  title: "Metric Details",
};

export default DataBlockInfoOverlay;