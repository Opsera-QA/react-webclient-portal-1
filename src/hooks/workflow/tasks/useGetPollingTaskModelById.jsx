import {useEffect, useState} from "react";
import useGetPollingTaskById from "hooks/workflow/tasks/useGetPollingTaskById";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useGetTaskModel from "components/tasks/hooks/useGetTaskModel";

export default function useGetPollingTaskModelById(
  id,
  handleErrorFunction,
) {
  const [taskModel, setTaskModel] = useState(undefined);
  const { getNewTaskModel } = useGetTaskModel();
  const {
    task,
    loadData,
    isLoading,
    error,
    setError,
    status,
    updatedAt,
    runCount,
    taskStartTime,
  } = useGetPollingTaskById(id, handleErrorFunction);

  useEffect(() => {
    if (ObjectHelper.areObjectsEqualLodash(task, taskModel?.getOriginalData()) !== true) {
      setTaskModel({...getNewTaskModel(task, false)});
    }
  }, [task]);

  return ({
    taskModel: taskModel,
    setTaskModel: setTaskModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
    status: status,
    updatedAt: updatedAt,
    runCount: runCount,
    taskStartTime: taskStartTime,
  });
}
