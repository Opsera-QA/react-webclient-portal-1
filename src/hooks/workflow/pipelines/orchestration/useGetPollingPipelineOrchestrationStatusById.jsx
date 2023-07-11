import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetPipelineOrchestrationStatusById
from "hooks/workflow/pipelines/orchestration/useGetPipelineOrchestrationStatusById";

export default function useGetPollingPipelineOrchestrationStatusById(
  id,
  pollingDelayInMs = 10000,
  handleErrorFunction,
  enabled = true,
) {
  const {
    isLoading,
    error,
    setError,
    loadData,
    status,
    isQueued,
    lastStep,
    runCount,
    restingStepId,
    updatedAt,
  } = useGetPipelineOrchestrationStatusById(id, handleErrorFunction);

  usePollingInterval(() => {
    if (loadData) {
      loadData();
    }
  }, Math.max(pollingDelayInMs, 5000), error, enabled);

  return ({
    status: status,
    isQueued: isQueued,
    lastStep: lastStep,
    runCount: runCount,
    restingStepId: restingStepId,
    updatedAt: updatedAt,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
