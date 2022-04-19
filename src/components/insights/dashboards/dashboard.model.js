import ModelBase from "core/data_model/model.base";
import toolsActions from "components/inventory/tools/tools-actions";
import {isActionAllowed} from "components/common/helpers/role-helpers";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";

export class DashboardModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    customerAccessRules,
    roleDefinitions,
    setStateFunction,
  ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.customerAccessRules = customerAccessRules;
    this.roleDefinitions = roleDefinitions;
    this.updateAllowed = this.canPerformAction("update_dashboard");
    this.deleteAllowed = this.canPerformAction("delete_dashboard");
    this.editAccessRolesAllowed = this.canPerformAction("edit_access_roles");
  }

  createModel = async () => {
    return await dashboardsActions.createDashboardV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  saveModel = async () => {
    return await toolsActions.updateDashboardV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  // TODO: Not used yet
  deleteModel = async () => {
    throw "Not supported yet!";
  };

  getDetailViewLink = () => {
    return `/insights/dashboards/${this.getMongoDbId()}/viewer`;
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")}`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new DashboardModel(
      { ...newData },
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.customerAccessRules,
      this.roleDefinitions,
      this.setStateFunction,
    );
  };

  canPerformAction = (action) => {
    return isActionAllowed(
      this.customerAccessRules,
      action,
      this.getData("owner"),
      this.getData("roles"),
      this.roleDefinitions,
      true,
    );
  };
}

export default DashboardModel;


