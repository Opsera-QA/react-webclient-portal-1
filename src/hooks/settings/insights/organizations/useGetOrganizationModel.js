import useGetModelBase from "hooks/model/useGetModelBase";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import useOrganizationActions from "hooks/settings/insights/organizations/useOrganizationActions";
import {organizationHelper} from "components/settings/organizations/organization.helper";
import OrganizationRoleHelper from "@opsera/know-your-role/roles/settings/organizations/organizationRole.helper";

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
      return OrganizationRoleHelper.canCreateOrganization(
        initialModel.userData,
      );
    };

    initialModel.canUpdate = () => {
      return OrganizationRoleHelper.canUpdateOrganization(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canDelete = () => {
      return OrganizationRoleHelper.canDeleteOrganization(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canTransferOwnership = () => {
      return OrganizationRoleHelper.canTransferOrganizationOwnership(
        initialModel.userData,
        initialModel.getOriginalData(),
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


