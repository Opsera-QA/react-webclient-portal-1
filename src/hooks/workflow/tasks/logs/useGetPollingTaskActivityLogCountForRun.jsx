import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetTaskActivityLogCountForRun from "hooks/workflow/tasks/logs/useGetTaskActivityLogCountForRun";

export default function useGetPollingTaskActivityLogCountForRun(
  id,
  runCount,
  pollingDelayInMs = 10000,
  handleErrorFunction,
) {
  const {
    logCount,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetTaskActivityLogCountForRun(id, runCount, handleErrorFunction);

  usePollingInterval(() => {
    if (loadData) {
      loadData();
    }
  }, Math.max(pollingDelayInMs, 5000));

  return ({
    logCount: logCount,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
