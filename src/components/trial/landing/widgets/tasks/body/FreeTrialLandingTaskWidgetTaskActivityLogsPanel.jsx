import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { PIPELINE_WIDGET_HEADER_ITEMS } from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";

export default function FreeTrialLandingTaskWidgetTaskActivityLogsPanel(
  {
    selectedPipeline,
    className,
  }) {
  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <TaskActivityLogTreeTable
        pipeline={selectedPipeline}
        pipelineId={selectedPipeline?._id}
        pipelineRunCount={selectedPipeline?.workflow?.run_count}
      />
    </div>
  );
}

FreeTrialLandingTaskWidgetTaskActivityLogsPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  className: PropTypes.string,
};