import React from 'react';
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetPipelineActivityLogCountForRun from "hooks/workflow/pipelines/logs/useGetPipelineActivityLogCountForRun";

export default function useGetPollingPipelineActivityLogCountForRun(
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
  } = useGetPipelineActivityLogCountForRun(id, runCount, handleErrorFunction);

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
