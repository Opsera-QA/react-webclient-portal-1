import React from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { PIPELINE_WIDGET_HEADER_ITEMS } from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import PipelineWidgetsPipelineSummaryPanel
  from "components/trial/pipelines/widgets/body/PipelineWidgetsPipelineSummaryPanel";
import PipelineWidgetsPipelineActivityLogsPanel
  from "components/trial/pipelines/widgets/body/PipelineWidgetsPipelineActivityLogsPanel";

export default function PipelineWidgetsBody(
  {
    selectedPipeline,
    setSelectedPipeline,
    selectedHeaderItem,
    isLoading,
    setIsLoading,
  }) {
  const getBody = () => {
    switch (selectedHeaderItem) {
      case PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE:
        return (
          <PipelineWidgetsPipelineSummaryPanel
            selectedPipeline={selectedPipeline}
            setSelectedPipeline={setSelectedPipeline}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className={"m-3"}
          />
        );
      case PIPELINE_WIDGET_HEADER_ITEMS.LOGS:
        return (
          <PipelineWidgetsPipelineActivityLogsPanel
            selectedPipeline={selectedPipeline}
            className={"m-3"}
          />
        );
      case PIPELINE_WIDGET_HEADER_ITEMS.METRICS:
        return (selectedHeaderItem);
      default:
        return (
          <div>
            Please select a pipeline.
          </div>
        );
    }
  };

  if (selectedHeaderItem == null) {
    return null;
  }

  return (
    <div>
      {getBody()}
    </div>
  );
}

PipelineWidgetsBody.propTypes = {
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
  selectedPipelineId: PropTypes.string,
  selectedHeaderItem: PropTypes.string,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};