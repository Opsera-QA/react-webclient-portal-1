import React, { useState } from "react";
import PipelineWidgetsPipelineSelectInput
  from "components/free_trial/pipelines/widgets/PipelineWidgetsPipelineSelectInput";

function PipelineWidgetsHeader() {
  const [selectedPipeline, setSelectedPipeline] = useState(undefined);

  return (
    <div>
      <PipelineWidgetsPipelineSelectInput
        selectedPipeline={selectedPipeline}
        setSelectedPipeline={setSelectedPipeline}
      />
    </div>
  );
}

PipelineWidgetsHeader.propTypes = {};

export default PipelineWidgetsHeader;
