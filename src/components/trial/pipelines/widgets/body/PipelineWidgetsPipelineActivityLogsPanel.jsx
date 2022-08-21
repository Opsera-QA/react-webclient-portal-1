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
    selectedPipelineId,
    setSelectedPipeline,
    className,
    isLoading,
    setIsLoading,
  }) {
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

  if (isMongoDbId(selectedPipelineId) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <PipelineActivityLogTreeTable
        pipeline={selectedPipeline}
        pipelineStatus={selectedPipeline?.workflow?.last_step?.status}
        pipelineId={selectedPipeline?._id}
        getPipeline={getPipeline}
        pipelineRunCount={selectedPipeline?.workflow?.run_count}
      />
    </div>
  );
}

PipelineWidgetsPipelineActivityLogsPanel.propTypes = {
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
  selectedPipelineId: PropTypes.string,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  className: PropTypes.string,
};