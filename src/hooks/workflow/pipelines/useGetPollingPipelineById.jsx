import useGetPipelineById from "hooks/workflow/pipelines/useGetPipelineById";
import usePollingInterval from "hooks/general/usePollingInterval";
import useGetPollingPipelineOrchestrationStatusById
  from "hooks/workflow/pipelines/orchestration/useGetPollingPipelineOrchestrationStatusById";
import {useEffect} from "react";

export default function useGetPollingPipelineById(
  id,
  handleErrorFunction,
) {
  const {
    pipeline,
    setPipeline,
    loadData,
    isLoading,
    error,
    setError,
  } = useGetPipelineById(id, handleErrorFunction);
  const {
    status,
    isQueued,
    runCount,
    lastStep,
    restingStepId,
    updatedAt,
  } = useGetPollingPipelineOrchestrationStatusById(id, 15000, error, pipeline != null);

  useEffect(() => {
    console.log(`Refreshing pipeline with \n   status: [${status}]\n    run count: [${runCount}]\n   Resting Step ID: [${restingStepId}] \n Last Updated At: [${updatedAt}]`);
    loadData().catch((error) => console.error(error));
  }, [status, runCount, restingStepId, updatedAt]);

  return ({
    pipeline: pipeline,
    setPipeline: setPipeline,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
    status: status,
    isQueued: isQueued,
    lastStep: lastStep,
    updatedAt: updatedAt,
    runCount: runCount,
    restingStepId: restingStepId,
  });
}
