import ModelBase from "core/data_model/model.base";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import DashboardRoleHelper from "@opsera/know-your-role/roles/analytics/dashboards/dashboardRole.helper";

export default class DashboardModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      dashboardMetadata,
      newModel,
    );
  }

  canCreate = () => {
    return DashboardRoleHelper.canCreateDashboard(
      this.userData,
    );
  };

  createModel = async () => {
    return await dashboardsActions.createDashboardV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  canUpdate = () => {
    return DashboardRoleHelper.canUpdateDashboard(
      this.userData,
      this.data
    );
  };

  saveModel = async () => {
    return await dashboardsActions.updateDashboardV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  canDelete = () => {
    return DashboardRoleHelper.canDeleteDashboard(
      this.userData,
      this.data
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
    return `${capitalizeFirstLetter(this.getOriginalValue("name"))}`;
  };

  canAddDashboardMetric = () => {
    return DashboardRoleHelper.canAddMetricToDashboard(
      this.userData,
      this.data,
    );
  };

  canDeleteDashboardMetric = () => {
    return DashboardRoleHelper.canDeleteDashboardMetric(
      this.userData,
      this.data,
    );
  };

  canUpdateDashboardMetric = () => {
    return DashboardRoleHelper.canUpdateDashboardMetric(
      this.userData,
      this.data,
    );
  };

  canUpdateDashboardFilters = () => {
    return DashboardRoleHelper.canUpdateDashboardFilters(
      this.userData,
      this.data,
    );
  };

  canPublishDashboardToPrivateCatalog = () => {
    return DashboardRoleHelper.canPublishDashboardToPrivateCatalog(
      this.userData,
      this.data,
    );
  };

  canTransferDashboardOwnershipToNewUser = () => {
    return DashboardRoleHelper.canTransferDashboardOwnership(
      this.userData,
      this.data,
    );
  };

}


