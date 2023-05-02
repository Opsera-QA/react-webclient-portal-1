import ToolModel from "components/inventory/tools/tool.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import {useHistory} from "react-router-dom";

export default function useGetRegistryToolModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();
  const history = useHistory();

  const getRegistryToolModel = (tool, isNew) => {
    const newModel = new ToolModel(
      tool,
      isNew,
    );
    newModel.getAccessToken = getAccessToken;
    newModel.cancelTokenSource = cancelTokenSource;
    newModel.userData = userData;
    newModel.history = history;

    if (isNew === true) {
      newModel.setData("roles",  RoleHelper.getInitialRolesArray(userData));
    }

    return newModel;
  };

  return ({
    getRegistryToolModel: getRegistryToolModel,
  });
}
