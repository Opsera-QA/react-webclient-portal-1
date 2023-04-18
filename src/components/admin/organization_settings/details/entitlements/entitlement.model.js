import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import entitlementMetadata
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.metadata";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default class EntitlementModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      entitlementMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return entitlementConstants.getEntitlementNameLabel(this.getData("name"));
  };

  clone = () => {
    const newModel = new EntitlementModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
    );

    newModel.userData = this.userData;

    return newModel;
  };

  getType = () => {
    return "Entitlement";
  }
}


