import React, { useState } from "react";
import PipelineWidgetsPipelineSelectInput
  from "components/trial/pipelines/widgets/PipelineWidgetsPipelineSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";

function PipelineWidgetsHeader() {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);

  return (
    <div className={"d-flex"}>
      <PipelineWidgetsPipelineSelectInput
        selectedPipelineId={selectedPipelineId}
        setSelectedPipelineId={setSelectedPipelineId}
      />
    </div>
  );
}

PipelineWidgetsHeader.propTypes = {};

export default PipelineWidgetsHeader;
