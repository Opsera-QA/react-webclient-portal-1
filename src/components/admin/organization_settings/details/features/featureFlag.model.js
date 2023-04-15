import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import featureFlagMetadata
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.metadata";

export default class FeatureFlagModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      featureFlagMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return featureFlagConstants.getFeatureFlagNameLabel(this.getData("name"));
  };

  clone = () => {
    const newModel = new FeatureFlagModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
    );

    newModel.userData = this.userData;

    return newModel;
  };

  getType = () => {
    return "Feature Flag";
  }
}


