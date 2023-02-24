import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import analyticsDataEntryMetadata
  from "@opsera/definitions/constants/settings/analytics_data_entries/analyticsDataEntry.metadata";
import {analyticsDataEntryHelper} from "components/settings/analytics_data_entry/analyticsDataEntry.helper";
import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";

export default class AnalyticsDataEntryModel extends ModelBase {
  constructor(
    analyticsDataEntryActions,
    analyticsDataEntry,
    newModel,
  ) {
    super(
      analyticsDataEntry,
      analyticsDataEntryMetadata,
      newModel,
    );
    this.analyticsDataEntryActions = analyticsDataEntryActions;
  }

  createModel = async () => {
    const canCreate = this.canCreate();

    if (canCreate !== true) {
      throw "Access Denied";
    }
    
    return await this.analyticsDataEntryActions.createAnalyticsDataEntry(this);
  };

  canUpdate = async () => {
    const canUpdate = this.canUpdate();

    if (canUpdate !== true) {
      throw "Access Denied";
    }
    
    return await this.analyticsDataEntryActions.updateAnalyticsDataEntry(this);
  };

  // TODO: Not used yet
  deleteModel = async () => {
    const canDelete = this.canDelete();

    if (canDelete !== true) {
      throw "Access Denied";
    }

    await this.analyticsDataEntryActions.deleteAnalyticsDataEntryById(this?.getMongoDbId());
  };

  canCreate = () => {
    return AnalyticsDataEntryRoleHelper.canCreateAnalyticsDataEntry(
      this.userData,
    );
  };

  canUpdate = () => {
    return AnalyticsDataEntryRoleHelper.canUpdateAnalyticsDataEntry(
      this.userData,
      this.data,
    );
  };

  canDelete = () => {
    return AnalyticsDataEntryRoleHelper.canDeleteAnalyticsDataEntry(
      this.userData,
      this.data,
    );
  };

  canTransferOwnership = () => {
    return AnalyticsDataEntryRoleHelper.canTransferAnalyticsDataEntryOwnership(
      this.userData,
      this.data,
    );
  };

  getDetailViewLink = () => {
    return analyticsDataEntryHelper.getDetailViewLink(this.getMongoDbId());
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("kpi_identifier")} Analytics Data Entry`;
  };

  clone = () => {
    return new AnalyticsDataEntryModel(DataParsingHelper.cloneDeep(
        { ...this.data }),
      this.isNew(),
    );
  };
}


