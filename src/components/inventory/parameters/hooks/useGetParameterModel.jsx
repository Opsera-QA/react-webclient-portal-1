import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import ParameterModel from "components/inventory/parameters/parameter.model";

export default function useGetParameterModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getNewParameterModel = (
    parameter,
    isNew,
    setStateFunction,
    loadDataFunction,
  ) => {
    const newModel = new ParameterModel(
      parameter,
      isNew,
      setStateFunction,
      loadDataFunction,
    );
    newModel.getAccessToken = getAccessToken;
    newModel.cancelTokenSource = cancelTokenSource;
    newModel.userData = userData;

    if (isNew === true) {
      newModel.setData("roles", RoleHelper.getInitialRolesArray(userData));
    }

    return newModel;
  };

  return ({
    getNewParameterModel: getNewParameterModel,
  });
}
