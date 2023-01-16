import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyMetadata from "@opsera/definitions/constants/settings/organization-settings/policies/policy.metadata";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";

export default class PolicyModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      policyMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return policyConstants.getPolicyNameLabel(this.getData("name"));
  };

  clone = () => {
    const newModel = new PolicyModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
    );

    newModel.userData = this.userData;

    return newModel;
  };

  getType = () => {
    return "Policy";
  }
}


