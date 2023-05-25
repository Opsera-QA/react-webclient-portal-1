import analyticsDataEntryMetadata
  from "@opsera/definitions/constants/settings/analytics_data_entries/analyticsDataEntry.metadata";
import {analyticsDataEntryHelper} from "components/settings/analytics_data_entry/analyticsDataEntry.helper";
import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";
import useGetModelBase from "hooks/model/useGetModelBase";
import useAnalyticsDataEntryActions from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryActions";

export default function useGetAnalyticsDataEntryModel() {
  const getModelBase = useGetModelBase();
  const analyticsDataEntryActions = useAnalyticsDataEntryActions();

  const getAnalyticsDataEntryModel = (analyticsDataEntry, newModel) => {
    const initialModel = getModelBase(analyticsDataEntry, analyticsDataEntryMetadata, newModel);

    initialModel.createModel = async () => {
      return await analyticsDataEntryActions.createAnalyticsDataEntry(initialModel);
    };

    initialModel.saveModel = async () => {
      return await analyticsDataEntryActions.updateAnalyticsDataEntry(initialModel);
    };

    // TODO: Not used yet
    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await analyticsDataEntryActions.deleteAnalyticsDataEntryById(initialModel?.getMongoDbId());
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
      return analyticsDataEntryHelper.getDetailViewLink(initialModel.getMongoDbId());
    };

    initialModel.getDetailViewTitle = () => {
      return `${initialModel.getOriginalValue("kpi_identifier")} Analytics Data Entry`;
    };

    return initialModel;
  };

  return getAnalyticsDataEntryModel;
}


