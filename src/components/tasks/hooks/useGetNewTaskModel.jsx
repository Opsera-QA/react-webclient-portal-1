import { useState } from "react";
import useGetTaskModel from "components/tasks/hooks/useGetTaskModel";

export default function useGetNewTaskModel() {
  const { getNewTaskModel } = useGetTaskModel();
  const [taskModel, setTaskModel] = useState(getNewTaskModel(undefined, true));

  return ({
    taskModel: taskModel,
    setTaskModel: setTaskModel,
  });
}
