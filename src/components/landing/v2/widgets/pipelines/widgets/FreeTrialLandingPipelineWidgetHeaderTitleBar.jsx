import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineActionControls from "components/workflow/pipelines/action_controls/PipelineActionControls";
import useGetPollingPipelineOrchestrationStatusById
  from "hooks/workflow/pipelines/orchestration/useGetPollingPipelineOrchestrationStatusById";

export default function FreeTrialLandingPipelineWidgetHeaderTitleBar(
  {
    selectedPipeline,
    setSelectedPipeline,
    setIsLoading,
    selectedHeaderItem,
  }) {
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
    accessRoleData,
    themeConstants,
  } = useComponentStateReference();
  const [refreshCount, setRefreshCount] = useState(0);
  const {
    status,
    isQueued,
  } = useGetPollingPipelineOrchestrationStatusById(selectedPipeline?._id, 15000);

  const getPipeline = async () => {
    try {
      if (isMounted?.current !== true) {
        return;
      }

      const newRefreshCount = refreshCount + 1;
      setRefreshCount(newRefreshCount);

      setIsLoading(true);
      const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelTokenSource, selectedPipeline?._id);
      const newPipeline = response?.data?.data;

      if (isMounted?.current === true) {
        if (newPipeline) {
          setSelectedPipeline({...newPipeline});
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
            workflowStatus={status}
            isQueued={isQueued}
          />
        </div>
      );
    }
  };

  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={"d-flex w-100 justify-content-between"}>
      <div className={"my-auto"}>{selectedPipeline?.name}</div>
      <div className={"ml-auto"}>{getPipelineActionControls()}</div>
    </div>
  );
}

FreeTrialLandingPipelineWidgetHeaderTitleBar.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setIsLoading: PropTypes.func,
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};
