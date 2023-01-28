import useGetModelBase from "hooks/model/useGetModelBase";
import {
  analyticsProjectDataMappingHelper
} from "components/settings/data_mapping/projects/analyticsProjectDataMapping.helper";
import projectDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/project/projectDataMapping.metadata";
import useAnalyticsProjectDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/projects/useAnalyticsProjectDataMappingActions";
import AnalyticsProjectDataMappingRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_mappings/projects/analyticsProjectDataMappingRole.helper";

export default function useGetAnalyticsProjectDataMappingModel() {
  const getModelBase = useGetModelBase();
  const analyticsProjectDataMappingActions = useAnalyticsProjectDataMappingActions();

  const getAnalyticsProjectDataMappingModel = (analyticsDataEntry, newModel) => {
    const initialModel = getModelBase(analyticsDataEntry, projectDataMappingMetadata, newModel);

    initialModel.createModel = async () => {
      return await analyticsProjectDataMappingActions.createProjectDataMapping(initialModel);
    };

    initialModel.saveModel = async () => {
      return await analyticsProjectDataMappingActions.updateProjectDataMapping(initialModel);
    };

    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await analyticsProjectDataMappingActions.deleteProjectDataMapping(initialModel?.getMongoDbId());
    };

    initialModel.canCreate = () => {
      return AnalyticsProjectDataMappingRoleHelper.canCreateAnalyticsProjectDataMapping(
        initialModel.userData,
      );
    };

    initialModel.canUpdate = () => {
      return AnalyticsProjectDataMappingRoleHelper.canUpdateAnalyticsProjectDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canDelete = () => {
      return AnalyticsProjectDataMappingRoleHelper.canDeleteAnalyticsProjectDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canTransferOwnership = () => {
      return AnalyticsProjectDataMappingRoleHelper.canTransferAnalyticsProjectDataMappingOwnership(
        initialModel.userData,
        initialModel.getOriginalData(),
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


