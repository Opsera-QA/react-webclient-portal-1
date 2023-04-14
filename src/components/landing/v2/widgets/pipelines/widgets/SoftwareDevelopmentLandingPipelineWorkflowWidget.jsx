import React, { useState } from "react";
import PropTypes from "prop-types";
import FreeTrialLandingPipelineWidgetBody from "components/trial/landing/widgets/pipelines/widgets/body/FreeTrialLandingPipelineWidgetBody";
import FreeTrialLandingWorkflowWidgetHeaderTabBarBase, {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS,
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";
import SoftwareDevelopmentLandingPipelineWidgetHeaderTitleBar
  from "components/landing/v2/widgets/pipelines/widgets/SoftwareDevelopmentLandingPipelineWidgetHeaderTitleBar";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";

export default function SoftwareDevelopmentLandingPipelineWorkflowWidget(
  {
    className,
    selectedPipeline,
    setSelectedPipeline,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineRefreshing, setPipelineRefreshing] = useState(false);

  const getTitleBar = () => {
    return (
      <SoftwareDevelopmentLandingPipelineWidgetHeaderTitleBar
        setSelectedPipeline={setSelectedPipeline}
        selectedPipeline={selectedPipeline}
        selectedHeaderItem={selectedHeaderItem}
        setIsLoading={setIsLoading}
      />
    );
  };

  return (
    <div className={className}>
      <WidgetDataBlockBase
        title={getTitleBar()}
        isLoading={isLoading || pipelineRefreshing}
      >
        <FreeTrialLandingWorkflowWidgetHeaderTabBarBase
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
