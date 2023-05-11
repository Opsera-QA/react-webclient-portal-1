import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetTaskOrchestrationStatusById from "hooks/workflow/tasks/orchestration/useGetTaskOrchestrationStatusById";

export default function useGetPollingTaskOrchestrationStatusById(
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
    runCount,
    updatedAt,
    taskStartTime,
  } = useGetTaskOrchestrationStatusById(id, handleErrorFunction);

  usePollingInterval(() => {
    if (loadData) {
      loadData();
    }
  }, Math.max(pollingDelayInMs, 5000), error, enabled);

  return ({
    status: status,
    runCount: runCount,
    updatedAt: updatedAt,
    taskStartTime: taskStartTime,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
