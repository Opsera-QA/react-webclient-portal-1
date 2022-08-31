import React from "react";
import PropTypes from "prop-types";
import FreeTrialLandingPipelineWidgetPipelineSummaryPanel
  from "components/trial/landing/widgets/pipelines/widgets/body/FreeTrialLandingPipelineWidgetPipelineSummaryPanel";
import FreeTrialLandingPipelineWidgetPipelineActivityLogsPanel
  from "components/trial/landing/widgets/pipelines/widgets/body/FreeTrialLandingPipelineWidgetPipelineActivityLogsPanel";
import {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";
import FreeTrialLandingPipelineWidgetAnalyticsBody
  from "components/trial/landing/widgets/pipelines/analytics/FreeTrialLandingPipelineWidgetAnalyticsBody";

export default function FreeTrialLandingPipelineWidgetBody(
  {
    selectedPipeline,
    setSelectedPipeline,
    selectedHeaderItem,
    isLoading,
    setIsLoading,
  }) {
  const getBody = () => {
    switch (selectedHeaderItem) {
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY:
        return (
          <FreeTrialLandingPipelineWidgetPipelineSummaryPanel
            selectedPipeline={selectedPipeline}
            setSelectedPipeline={setSelectedPipeline}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className={"m-3"}
          />
        );
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS:
        return (
          <FreeTrialLandingPipelineWidgetPipelineActivityLogsPanel
            selectedPipeline={selectedPipeline}
            className={"m-3"}
          />
        );
      case FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS:
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

  if (selectedHeaderItem == null) {
    return null;
  }

  return (
    <div>
      {getBody()}
    </div>
  );
}

FreeTrialLandingPipelineWidgetBody.propTypes = {
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
  selectedPipelineId: PropTypes.string,
  selectedHeaderItem: PropTypes.string,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};