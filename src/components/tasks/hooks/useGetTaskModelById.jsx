import { useEffect, useState } from "react";
import useGetTaskModel from "components/tasks/hooks/useGetTaskModel";
import useGetTaskById from "hooks/workflow/tasks/useGetTaskById";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

export default function useGetTaskModelById(
  id,
) {
  const [taskModel, setTaskModel] = useState(undefined);
  const { getNewTaskModel } = useGetTaskModel();
  const {
    task,
    error,
    isLoading,
    loadData,
  } = useGetTaskById(id);

  useEffect(() => {
    if (ObjectHelper.areObjectsEqualLodash(task, taskModel?.getOriginalData()) !== true) {
      setTaskModel({...getNewTaskModel(task, false)});
    }
  }, [task]);

  return ({
    taskModel: taskModel,
    setTaskModel: setTaskModel,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
