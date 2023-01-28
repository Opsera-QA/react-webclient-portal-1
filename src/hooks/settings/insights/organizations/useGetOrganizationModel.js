import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";
import useGetModelBase from "hooks/model/useGetModelBase";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import useOrganizationActions from "hooks/settings/insights/organizations/useOrganizationActions";
import {organizationHelper} from "components/settings/organizations/organization.helper";

export default function useGetOrganizationModel() {
  const getModelBase = useGetModelBase();
  const organizationActions = useOrganizationActions();

  const getOrganizationModel = (organization, newModel) => {
    const initialModel = getModelBase(organization, organizationMetadata, newModel);

    initialModel.createModel = async () => {
      return await organizationActions.createOrganization(initialModel);
    };

    initialModel.saveModel = async () => {
      return await organizationActions.updateOrganization(initialModel);
    };

    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await organizationActions.deleteOrganization(initialModel?.getMongoDbId());
    };

    initialModel.canCreate = () => {
      return AnalyticsDataEntryRoleHelper.canCreateAnalyticsDataEntry(
        initialModel.userData,
      );
    };

    initialModel.canUpdate = () => {
      return AnalyticsDataEntryRoleHelper.canUpdateAnalyticsDataEntry(
        initialModel.userData,
        initialModel.getCurrentData(),
      );
    };

    initialModel.canDelete = () => {
      return AnalyticsDataEntryRoleHelper.canDeleteAnalyticsDataEntry(
        initialModel.userData,
        initialModel.getCurrentData(),
      );
    };

    initialModel.canTransferOwnership = () => {
      return AnalyticsDataEntryRoleHelper.canTransferAnalyticsDataEntryOwnership(
        initialModel.userData,
        initialModel.getCurrentData(),
      );
    };

    initialModel.getDetailViewLink = () => {
      return organizationHelper.getDetailViewLink(initialModel.getMongoDbId());
    };

    initialModel.getDetailViewTitle = () => {
      return `${initialModel.getOriginalValue("name")}`;
    };

    return initialModel;
  };

  return getOrganizationModel;
}


