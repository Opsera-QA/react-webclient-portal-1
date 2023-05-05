import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetTaskById(
  id,
  handleErrorFunction,
) {
  const [task, setTask] = useState(undefined);
  const taskActions = useTaskActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const {
    isFreeTrial,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    setTask(undefined);

    if (isMongoDbId(id) === true && loadData) {
      loadData(getTaskById, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getTaskById = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await taskActions.getTaskById(id);
    const newTask = DataParsingHelper.parseObject(response?.data?.data);

    if (isOpseraAdministrator !== true
      && isFreeTrial === true
      && ObjectAccessRoleHelper.isUserObjectOwner(userData, task) !== true) {
      return;
    }

    if (ObjectHelper.areObjectsEqualLodash(newTask, task) !== true) {
      setTask({...newTask});
    }
  };

  return ({
    task: task,
    setTask: setTask,
    loadData: async () => await loadData(getTaskById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
