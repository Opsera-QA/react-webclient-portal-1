import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetTaskModel from "components/tasks/hooks/useGetTaskModel";
import taskActions from "components/tasks/task.actions";

export default function useGetTaskModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [taskModel, setTaskModel] = useState(undefined);
  const { getNewTaskModel } = useGetTaskModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setTaskModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTask();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTask = async () => {
    const response = await taskActions.getTaskByIdV2(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const task = response?.data?.data;

    if (task) {
      const newModel = getNewTaskModel(task, false);
      setTaskModel({...newModel});
    }
  };

  return ({
    taskModel: taskModel,
    setTaskModel: setTaskModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
