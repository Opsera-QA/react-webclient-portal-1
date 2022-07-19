import React, { useState } from "react";
import PipelineWidgetsPipelineSelectInput
  from "components/free_trial/pipelines/widgets/PipelineWidgetsPipelineSelectInput";

function PipelineWidgetsHeader() {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);

  return (
    <div>
      <PipelineWidgetsPipelineSelectInput
        selectedPipelineId={selectedPipelineId}
        setSelectedPipelineId={setSelectedPipelineId}
      />
    </div>
  );
}

PipelineWidgetsHeader.propTypes = {};

export default PipelineWidgetsHeader;
