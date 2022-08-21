import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { PIPELINE_WIDGET_HEADER_ITEMS } from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";

export default function PipelineWidgetsPipelineActivityLogsPanel(
  {
    selectedPipeline,
    className,
  }) {
  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <PipelineActivityLogTreeTable
        pipeline={selectedPipeline}
        pipelineId={selectedPipeline?._id}
        pipelineRunCount={selectedPipeline?.workflow?.run_count}
      />
    </div>
  );
}

PipelineWidgetsPipelineActivityLogsPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  className: PropTypes.string,
};