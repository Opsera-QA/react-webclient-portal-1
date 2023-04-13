import React, { useState } from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import PipelineActionControls from "components/workflow/pipelines/action_controls/PipelineActionControls";
import useGetPollingPipelineById from "hooks/workflow/pipelines/useGetPollingPipelineById";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase
  , {
  PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/landing/v2/widgets/pipelines/widgets/SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import FreeTrialLandingPipelineWidgetAnalyticsBody
  from "components/trial/landing/widgets/pipelines/analytics/FreeTrialLandingPipelineWidgetAnalyticsBody";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";

export default function SoftwareDevelopmentLandingPipelineWorkflowWidget(
  {
    className,
    selectedPipeline,
    setSelectedPipeline,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
  const {
    pipeline,
    isLoading,
    error,
    loadData,
    status,
    isQueued,
    runCount,
  } = useGetPollingPipelineById(selectedPipeline?._id);

  const getPipelineActionControls = () => (
    <PipelineActionControls
      pipeline={pipeline || selectedPipeline}
      workflowStatus={status}
      isLoading={isLoading}
      fetchData={loadData}
      isQueued={isQueued}
      runCount={runCount}
    />
  );

  const getBody = () => {
    switch (selectedHeaderItem) {
      case PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY:
        return (
          <div className={"m-3"}>
            <PipelineSummaryPanel
              pipeline={pipeline}
              parentWorkflowStatus={status}
              fetchPlan={loadData}
            />
          </div>
        );
      case PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS:
        return (
          <div className={"m-3"}>
            <PipelineActivityLogTreeTable
              showTableIcon={false}
              pipeline={pipeline || selectedPipeline}
              pipelineId={pipeline?._id || selectedPipeline?._id}
              pipelineRunCount={pipeline?.workflow.run_count || selectedPipeline?.workflow?.run_count}
            />
          </div>
        );
      case PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS:
        return (
          <FreeTrialLandingPipelineWidgetAnalyticsBody
            className={"m-3"}
          />
        );
      default:
        return (
          <div>
            Please select a pipeline.
          </div>
        );
    }
  };

  return (
    <div className={className}>
      <WidgetDataBlockBase
        title={DataParsingHelper.parseNestedString(pipeline, "name", selectedPipeline?.name)}
        rightSideTitleBarItems={getPipelineActionControls()}
        isLoading={isLoading}
      >
        <SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase
          selectedHeaderItem={selectedHeaderItem}
          setSelectedHeaderItem={setSelectedHeaderItem}
          selectedWorkflow={selectedPipeline}
          setSelectedWorkflow={setSelectedPipeline}
        />
        {getBody()}
      </WidgetDataBlockBase>
    </div>
  );
}

SoftwareDevelopmentLandingPipelineWorkflowWidget.propTypes = {
  className: PropTypes.string,
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};
