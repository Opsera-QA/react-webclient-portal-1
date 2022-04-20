import ModelBase from "core/data_model/model.base";
import toolsActions from "components/inventory/tools/tools-actions";
import {isActionAllowed} from "components/common/helpers/role-helpers";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";

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
    this.updateAllowed = this.canPerformAction("update_dashboard") || newModel === true;
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
    return `${capitalizeFirstLetter(this?.getOriginalValue("name"))}`;
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

  canAddDashboardMetric = () => {
    return this.canPerformAction("add_dashboard_metric");
  }

  canDeleteDashboardMetric = () => {
    return this.canPerformAction("delete_dashboard_metric");
  }

  canUpdateDashboardMetric = () => {
    return this.canPerformAction("update_dashboard_metric");
  }

  canUpdateDashboardFilters = () => {
    return this.canPerformAction("update_dashboard_filters");
  }

  canPublishDashboardToPrivateCatalog = () => {
    return this.canPerformAction("publish_dashboard_to_private_catalog");
  }

  canTransferDashboardOwnershipToNewUser = () => {
    return this.canPerformAction("transfer_dashboard_ownership_to_new_user");
  }

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


