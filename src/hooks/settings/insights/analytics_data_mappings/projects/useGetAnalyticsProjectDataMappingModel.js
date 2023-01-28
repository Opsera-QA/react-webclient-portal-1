import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";
import useGetModelBase from "hooks/model/useGetModelBase";
import {
  analyticsProjectDataMappingHelper
} from "components/settings/data_mapping/projects/analyticsProjectDataMapping.helper";
import projectDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/project/projectDataMapping.metadata";
import useAnalyticsDataProjectMappingActions
  from "hooks/settings/insights/analytics_data_mappings/projects/useAnalyticsDataProjectMappingActions";

export default function useGetAnalyticsProjectDataMappingModel() {
  const getModelBase = useGetModelBase();
  const analyticsDataProjectMappingActions = useAnalyticsDataProjectMappingActions();

  const getAnalyticsProjectDataMappingModel = (analyticsDataEntry, newModel) => {
    const initialModel = getModelBase(analyticsDataEntry, projectDataMappingMetadata, newModel);

    initialModel.createModel = async () => {
      return await analyticsDataProjectMappingActions.createAnalyticsDataEntry(initialModel);
    };

    initialModel.saveModel = async () => {
      return await analyticsDataProjectMappingActions.updateAnalyticsDataEntry(initialModel);
    };

    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await analyticsDataProjectMappingActions.deleteAnalyticsDataEntryById(initialModel?.getMongoDbId());
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
      return analyticsProjectDataMappingHelper.getDetailViewLink(initialModel.getMongoDbId());
    };

    initialModel.getDetailViewTitle = () => {
      return `${initialModel?.getData("key")} Project Data Mapping Tag`;
    };

    return initialModel;
  };

  return getAnalyticsProjectDataMappingModel;
}


