import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import pipelineActions from "components/workflow/pipeline-actions";

export default function FreeTrialLandingPipelineWidgetPipelineSummaryPanel(
  {
    selectedPipeline,
    setSelectedPipeline,
    className,
    isLoading,
    setIsLoading,
  }) {
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
    accessRoleData,
  } = useComponentStateReference();

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

  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <PipelineSummaryPanel
        customerAccessRules={accessRoleData}
        pipeline={selectedPipeline}
        setPipeline={setSelectedPipeline}
        setWorkflowStatus={setWorkflowStatus}
        parentWorkflowStatus={workflowStatus}
        fetchPlan={getPipeline}
        ownerName={selectedPipeline?.owner_name}
        showActionControls={false}
      />
    </div>
  );
}

FreeTrialLandingPipelineWidgetPipelineSummaryPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  className: PropTypes.string,
};