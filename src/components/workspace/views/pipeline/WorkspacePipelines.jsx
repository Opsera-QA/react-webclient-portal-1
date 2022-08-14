import React, {useEffect, useState} from "react";
import pipelineActions from "components/workflow/pipeline-actions";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkspacePipelineViews from "components/workspace/views/pipeline/WorkspacePipelineViews";

export default function WorkspacePipelines(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribedPipelineIds, setSubscribedPipelineIds] = useState([]);
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
      setSubscribedPipelineIds(response?.data?.subscriptions);
    }
  };

  return (
    <WorkspacePipelineViews
      pipelines={pipelines}
      isLoading={isLoading}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
      loadData={loadData}
      subscribedPipelineIds={subscribedPipelineIds}
    />
  );
}

WorkspacePipelines.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};