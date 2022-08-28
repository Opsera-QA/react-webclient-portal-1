import React, { useState } from "react";
import PropTypes from "prop-types";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/body/PipelineWidgetsBody";
import {
  PIPELINE_WIDGET_HEADER_ITEMS,
} from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import PipelinesWidgetHeaderTabBar from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTabBar";
import FreeTrialLandingPipelineWidgetHeaderTitleBar
  from "components/trial/pipelines/widgets/FreeTrialLandingPipelineWidgetHeaderTitleBar";

export default function FreeTrialLandingPipelineWorkflowWidget(
  {
    className,
    selectedWorkflowItem,
    setSelectedWorkflowItem,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineRefreshing, setPipelineRefreshing] = useState(false);

  const getTitleBar = () => {
    return (
      <FreeTrialLandingPipelineWidgetHeaderTitleBar
        setSelectedPipeline={setSelectedWorkflowItem}
        selectedPipeline={selectedWorkflowItem}
        selectedHeaderItem={selectedHeaderItem}
        setIsLoading={setIsLoading}
      />
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        titleIcon={faDraftingCompass}
        title={getTitleBar()}
        isLoading={isLoading || pipelineRefreshing}
      >
        <PipelinesWidgetHeaderTabBar
          selectedHeaderItem={selectedHeaderItem}
          setSelectedHeaderItem={setSelectedHeaderItem}
        />
        <PipelineWidgetsBody
          selectedHeaderItem={selectedHeaderItem}
          selectedPipeline={selectedWorkflowItem}
          setSelectedPipeline={setSelectedWorkflowItem}
          isLoading={isLoading}
          setIsLoading={setPipelineRefreshing}
        />
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingPipelineWorkflowWidget.propTypes = {
  className: PropTypes.string,
  selectedWorkflowItem: PropTypes.object,
  setSelectedWorkflowItem: PropTypes.func,
};
