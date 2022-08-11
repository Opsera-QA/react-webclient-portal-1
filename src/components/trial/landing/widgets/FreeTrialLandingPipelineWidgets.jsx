import React, { useState } from "react";
import PropTypes from "prop-types";
import PipelineWidgetsHeader from "components/trial/pipelines/widgets/PipelineWidgetsHeader";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";

export default function FreeTrialLandingPipelineWidgets({className}) {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);

  return (
    <div className={className}>
      <div className={"mt-3"}>
        <PipelineWidgetsHeader
          selectedPipelineId={selectedPipelineId}
          setSelectedPipelineId={setSelectedPipelineId}
        />
      </div>
      <div>
        <PipelineWidgetsBody />
      </div>
    </div>
  );
}

FreeTrialLandingPipelineWidgets.propTypes = {
  className: PropTypes.string,
};
