import useGetModelBase from "hooks/model/useGetModelBase";
import {
  analyticsUserDataMappingHelper
} from "components/settings/data_mapping/users/analyticsUserDataMapping.helper";
import userDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/user/userDataMapping.metadata";
import useAnalyticsUserDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/users/useAnalyticsUserDataMappingActions";
import AnalyticsUserDataMappingRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_mappings/users/analyticsUserDataMappingRole.helper";

export default function useGetAnalyticsUserDataMappingModel() {
  const getModelBase = useGetModelBase();
  const analyticsDataUserMappingActions = useAnalyticsUserDataMappingActions();

  const getAnalyticsUserDataMappingModel = (analyticsDataEntry, newModel) => {
    const initialModel = getModelBase(analyticsDataEntry, userDataMappingMetadata, newModel);

    initialModel.createModel = async () => {
      return await analyticsDataUserMappingActions.createUserDataMapping(initialModel);
    };

    initialModel.saveModel = async () => {
      return await analyticsDataUserMappingActions.updateUserDataMapping(initialModel);
    };

    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await analyticsDataUserMappingActions.deleteUserDataMapping(initialModel?.getMongoDbId());
    };

    initialModel.canCreate = () => {
      return AnalyticsUserDataMappingRoleHelper.canCreateAnalyticsUserDataMapping(
        initialModel.userData,
      );
    };

    initialModel.canUpdate = () => {
      return AnalyticsUserDataMappingRoleHelper.canUpdateAnalyticsUserDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canDelete = () => {
      return AnalyticsUserDataMappingRoleHelper.canDeleteAnalyticsUserDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canTransferOwnership = () => {
      return AnalyticsUserDataMappingRoleHelper.canTransferAnalyticsUserDataMappingOwnership(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.getDetailViewLink = () => {
      return analyticsUserDataMappingHelper.getDetailViewLink(initialModel.getMongoDbId());
    };

    initialModel.getDetailViewTitle = () => {
      return `User Data Mapping`;
    };

    return initialModel;
  };

  return getAnalyticsUserDataMappingModel;
}


