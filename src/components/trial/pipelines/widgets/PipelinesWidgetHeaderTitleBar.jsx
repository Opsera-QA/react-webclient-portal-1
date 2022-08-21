import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import NavigationDropdownSelectInputBase
  from "temp-library-components/navigation/dropdown/input/NavigationDropdownSelectInputBase";
import PipelineActionControls from "components/workflow/pipelines/pipeline_details/PipelineActionControls";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import { mouseHelper } from "temp-library-components/helpers/mouse.helper";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";

export const PIPELINE_WIDGET_HEADER_ITEMS = {
  PIPELINE: "pipeline",
  LOGS: "logs",
  METRICS: "metrics",
  MORE: "more",
};

export default function PipelinesWidgetHeaderTitleBar(
  {
    selectedPipelineId,
    setSelectedPipelineId,
    selectedPipeline,
    setSelectedPipeline,
    setIsLoading,
    pipelines,
    dropdownMaxHeight,
    isLoading,
    selectedHeaderItem,
    setSelectedHeaderItem,
  }) {
  const history = useHistory();
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
    accessRoleData,
    themeConstants,
  } = useComponentStateReference();
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  const handleHeaderItemClick = (selectedOption) => {
    switch (selectedOption) {
      case PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.LOGS:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.LOGS);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.METRICS:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.METRICS);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.MORE:
        default:
          history.push(`/workflow/details/${selectedPipelineId}/summary`);
    }
  };

  const getLinkBar = () => {
    if (isMongoDbId(selectedPipelineId) === true) {
      return (
        <div className={"d-flex"}>
          <HeaderNavigationBarItem
            currentScreen={selectedHeaderItem}
            screenName={PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE}
            screenLabel={"Pipeline"}
            setCurrentScreen={handleHeaderItemClick}
            className={"ml-5 my-auto"}
            fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
          />
          <HeaderNavigationBarItem
            currentScreen={selectedHeaderItem}
            screenName={PIPELINE_WIDGET_HEADER_ITEMS.LOGS}
            screenLabel={"Logs"}
            setCurrentScreen={handleHeaderItemClick}
            className={"ml-3 my-auto"}
            fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
          />
          <HeaderNavigationBarItem
            currentScreen={selectedHeaderItem}
            screenName={PIPELINE_WIDGET_HEADER_ITEMS.METRICS}
            screenLabel={"Metrics"}
            setCurrentScreen={handleHeaderItemClick}
            className={"ml-3 my-auto"}
            fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
          />
          <HeaderNavigationBarItem
            currentScreen={selectedHeaderItem}
            screenName={PIPELINE_WIDGET_HEADER_ITEMS.MORE}
            screenLabel={"More..."}
            setCurrentScreen={handleHeaderItemClick}
            className={"ml-3 my-auto"}
            fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
          />
        </div>
      );
    }
  };

  const getSelectedPipelineName = () => {
    if (isMongoDbId(selectedPipelineId) === true) {
      if (Array.isArray(pipelines) && pipelines.length > 0) {
        const foundPipeline = pipelines?.find((pipeline) => pipeline?._id === selectedPipelineId);

        if (foundPipeline) {
          return foundPipeline?.name;
        }
      }

      return selectedPipelineId;
    }

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      if (isLoading === true) {
        return "Loading Pipelines";
      }

      return "No Pipelines Found";
    }

    return "Select a Pipeline";
  };

  const getPipeline = async () => {
    try {
      if (isMounted?.current !== true) {
        return;
      }

      const newRefreshCount = refreshCount + 1;
      setRefreshCount(newRefreshCount);

      setIsLoading(true);
      const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelTokenSource, selectedPipelineId);
      const newPipeline = response?.data?.data;

      if (isMounted?.current === true) {
        if (newPipeline) {
          setSelectedPipeline(newPipeline);
        } else {
          toastContext.showLoadingErrorDialog("Pipeline not found");
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPipelineActionControls = () => {
    if (selectedPipeline) {
      return (
        <div className={"ml-auto"}>
          <PipelineActionControls
            pipeline={selectedPipeline}
            disabledActionState={false}
            customerAccessRules={accessRoleData}
            fetchData={getPipeline}
            setPipeline={setSelectedPipeline}
            setParentWorkflowStatus={setWorkflowStatus}
          />
        </div>
      );
    }
  };

  return (
    <div className={"d-flex w-100"}>
      <NavigationDropdownSelectInputBase
        selectedOption={selectedPipelineId}
        selectOptions={pipelines}
        setDataFunction={setSelectedPipelineId}
        title={getSelectedPipelineName()}
        textField={"name"}
        valueField={"_id"}
        dropdownBodyMaxHeight={dropdownMaxHeight}
        isLoading={isLoading}
        className={"my-auto"}
      />
      {getLinkBar()}
      {getPipelineActionControls()}
    </div>
  );
}

PipelinesWidgetHeaderTitleBar.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setSelectedHeaderItem: PropTypes.func,
  selectedPipelineId: PropTypes.string,
  setSelectedPipelineId: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  pipelines: PropTypes.array,
  dropdownMaxHeight: PropTypes.string,
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};
