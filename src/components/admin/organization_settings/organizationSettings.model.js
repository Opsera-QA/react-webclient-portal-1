import ModelBase from "core/data_model/model.base";
import organizationSettingsMetadata
  from "@opsera/definitions/constants/settings/organization-settings/organizationSettings.metadata";

export default class OrganizationSettingsModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      organizationSettingsMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return this.getData("organizationAccountId");
  };

  getType = () => {
    return "Organization Settings";
  }
}


