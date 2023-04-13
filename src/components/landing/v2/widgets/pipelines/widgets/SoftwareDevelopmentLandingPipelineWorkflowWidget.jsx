import React, { useState } from "react";
import PropTypes from "prop-types";
import FreeTrialLandingPipelineWidgetBody from "components/trial/landing/widgets/pipelines/widgets/body/FreeTrialLandingPipelineWidgetBody";
import FreeTrialLandingWorkflowWidgetHeaderTabBarBase, {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS,
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import PipelineActionControls from "components/workflow/pipelines/action_controls/PipelineActionControls";
import useGetPollingPipelineById from "hooks/workflow/pipelines/useGetPollingPipelineById";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SoftwareDevelopmentLandingWorkspaceWidgetHeaderTabBarBase
  from "components/landing/v2/widgets/workspace/SoftwareDevelopmentLandingWorkspaceWidgetHeaderTabBarBase";
import SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase
  from "components/landing/v2/widgets/pipelines/widgets/SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase";

export default function SoftwareDevelopmentLandingPipelineWorkflowWidget(
  {
    className,
    selectedPipeline,
    setSelectedPipeline,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
  const [pipelineRefreshing, setPipelineRefreshing] = useState(false);
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

  return (
    <div className={className}>
      <WidgetDataBlockBase
        title={DataParsingHelper.parseNestedString(pipeline, "name", selectedPipeline?.name)}
        rightSideTitleBarItems={getPipelineActionControls()}
        isLoading={isLoading || pipelineRefreshing}
      >
        <SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase
          selectedHeaderItem={selectedHeaderItem}
          setSelectedHeaderItem={setSelectedHeaderItem}
          selectedWorkflow={selectedPipeline}
          setSelectedWorkflow={setSelectedPipeline}
        />
        <FreeTrialLandingPipelineWidgetBody
          selectedHeaderItem={selectedHeaderItem}
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
          isLoading={isLoading}
          setIsLoading={setPipelineRefreshing}
        />
      </WidgetDataBlockBase>
    </div>
  );
}

SoftwareDevelopmentLandingPipelineWorkflowWidget.propTypes = {
  className: PropTypes.string,
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};
