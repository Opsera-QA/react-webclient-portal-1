import React from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function PipelineStepJsonPanel({ pipelineStepData }) {
  return (
    <div className={"mt-1"}>
      <StandaloneJsonField
        titleText={"Pipeline Step JSON"}
        json={pipelineStepData}
        enableClipboard={false}
        displayDataTypes={false}
        collapsed={false}
        minimumHeight={"calc(100vh - 418px)"}
        maximumHeight={"calc(100vh - 418px)"}
      />
    </div>
  );
}

PipelineStepJsonPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};


export default PipelineStepJsonPanel;
