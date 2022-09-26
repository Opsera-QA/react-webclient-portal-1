import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import TaskModel from "components/tasks/task.model";

export default function useGetTaskModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getNewTaskModel = (task, isNew) => {
    const newModel = new TaskModel(
      task,
      isNew,
    );
    newModel.getAccessToken = getAccessToken;
    newModel.cancelTokenSource = cancelTokenSource;
    newModel.userData = userData;

    if (isNew === true) {
      newModel.setData("roles",  RoleHelper.getInitialRolesArray(userData));
    }

    return newModel;
  };

  return ({
    getNewTaskModel: getNewTaskModel,
  });
}
