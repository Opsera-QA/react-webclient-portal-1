import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import DashboardModel from "components/insights/dashboards/dashboard.model";

export default function useGetDashboardModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getNewDashboardModel = (dashboard, isNew, loadDataFunction) => {
    const newModel = new DashboardModel(
      dashboard,
      isNew,
    );
    newModel.getAccessToken = getAccessToken;
    newModel.cancelTokenSource = cancelTokenSource;
    newModel.loadDataFunction = loadDataFunction;
    newModel.userData = userData;

    if (isNew === true) {
      newModel.setData("roles",  RoleHelper.getInitialRolesArray(userData));
    }

    return newModel;
  };

  return ({
    getNewDashboardModel: getNewDashboardModel,
  });
}
