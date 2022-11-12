import React, {useEffect, useState} from "react";
import pipelineActions from "components/workflow/pipeline-actions";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialWorkspacePipelineViews from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelineViews";

export default function FreeTrialWorkspacePipelines(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelines([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPipelines();
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

  const getPipelines = async () => {
    const pipelineFields = [
      "type",
      "_id",
      "name",
      "owner",
      "workflow.last_step",
      "workflow.run_count",
      "workflow.last_run",
      "createdAt",
      "updatedAt",
    ];
    const response = await pipelineActions.getWorkspacePipelines(getAccessToken, cancelTokenSource, pipelineFields);
    const pipelines = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(pipelines)) {
      setPipelines([...pipelines]);
    }
  };

  return (
    <FreeTrialWorkspacePipelineViews
      pipelines={pipelines}
      isLoading={isLoading}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
      loadData={loadData}
    />
  );
}

FreeTrialWorkspacePipelines.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};