import React from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

export default function PipelineStepJsonPanel({ pipelineStepData }) {
  return (
    <div className={"pt-1"}>
      <StandaloneJsonField
        titleText={"Pipeline Step JSON"}
        json={pipelineStepData}
        displayDataTypes={false}
        collapsed={false}
        minimumHeight={"calc(100vh - 325px)"}
        maximumHeight={"calc(100vh - 325px)"}
      />
    </div>
  );
}

PipelineStepJsonPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};
