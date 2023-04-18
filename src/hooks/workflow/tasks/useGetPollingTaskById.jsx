import {useEffect} from "react";
import useGetTaskById from "hooks/workflow/tasks/useGetTaskById";
import useGetPollingTaskOrchestrationStatusById
  from "hooks/workflow/tasks/orchestration/useGetPollingTaskOrchestrationStatusById";

export default function useGetPollingTaskById(
  id,
  handleErrorFunction,
) {
  const {
    task,
    setTask,
    loadData,
    isLoading,
    error,
    setError,
  } = useGetTaskById(id, handleErrorFunction);
  const {
    status,
    runCount,
    updatedAt,
  } = useGetPollingTaskOrchestrationStatusById(id, 15000, error, task != null);

  useEffect(() => {
    console.log(`Refreshing Task [${id}] with \nStatus [${status}]\n Run Count [${runCount}]\n Last Updated At [${updatedAt}]`);
    loadData().catch((error) => console.error(error));
  }, [status, runCount, updatedAt]);

  return ({
    task: task,
    setTask: setTask,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
    status: status,
    updatedAt: updatedAt,
    runCount: runCount,
  });
}
