import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetPipelineOrchestrationStatusById
  from "hooks/workflow/pipelines/orchestration/useGetPipelineOrchestrationStatusById";

export default function useGetPollingPipelineOrchestrationStatusById(
  id,
  pollingDelayInMs = 10000,
  handleErrorFunction,
) {
  const {
    isLoading,
    error,
    setError,
    loadData,
    status,
    isQueued,
  } = useGetPipelineOrchestrationStatusById(id, handleErrorFunction);

  usePollingInterval(() => {
    if (loadData) {
      loadData();
    }
  }, Math.max(pollingDelayInMs, 5000));

  return ({
    status: status,
    isQueued: isQueued,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
