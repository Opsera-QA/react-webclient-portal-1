import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetTaskOrchestrationStatusById from "hooks/workflow/tasks/orchestration/useGetTaskOrchestrationStatusById";

export default function useGetPollingTaskOrchestrationStatusById(
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
    runCount,
    restingStepId,
    updatedAt,
  } = useGetTaskOrchestrationStatusById(id, handleErrorFunction);

  usePollingInterval(() => {
    if (loadData && [404, 403].includes(error?.response?.status) !== true) {
      loadData();
    }
  }, Math.max(pollingDelayInMs, 5000));

  return ({
    status: status,
    runCount: runCount,
    restingStepId: restingStepId,
    updatedAt: updatedAt,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
