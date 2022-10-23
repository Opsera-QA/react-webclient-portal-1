import useComponentStateReference from "hooks/useComponentStateReference";
import ScriptModel from "components/inventory/scripts/script.model";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";

export default function useGetScriptModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getNewScriptModel = (
    scriptData,
    isNew,
    setStateFunction,
    loadDataFunction,
  ) => {
    const newScriptModel = new ScriptModel(
      scriptData,
      isNew,
      setStateFunction,
      loadDataFunction,
    );
    newScriptModel.getAccessToken = getAccessToken;
    newScriptModel.cancelTokenSource = cancelTokenSource;
    newScriptModel.userData = userData;

    if (isNew === true) {
      newScriptModel.setData("roles", RoleHelper.getInitialRolesArray(userData));
    } else {
      newScriptModel.setData("value", undefined);
    }

    return newScriptModel;
  };

  return ({
    getNewScriptModel: getNewScriptModel,
  });
}
