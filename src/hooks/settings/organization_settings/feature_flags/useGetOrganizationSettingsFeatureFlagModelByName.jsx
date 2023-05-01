import {useContext, useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import {AuthContext} from "contexts/AuthContext";
import {hasStringValue} from "components/common/helpers/string-helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

export default function useGetOrganizationSettingsFeatureFlagModelByName(
  featureFlagName,
) {
  const [featureFlagModel, setFeatureFlagModel] = useState(undefined);
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const { organizationSettingsRecord } = useContext(AuthContext);

  useEffect(() => {
    if (hasStringValue(featureFlagName) === true) {
      const featureFlags = DataParsingHelper.parseNestedObject(organizationSettingsRecord, "features", []);
      const foundFeatureFlag = DataParsingHelper.parseObject(featureFlags.find((featureFlag) => featureFlag?.name === featureFlagName));

      if (foundFeatureFlag) {
        const newModel = getFeatureFlagModel(
          foundFeatureFlag,
          false,
        );
        const existingFeatureFlag = ObjectHelper.sortObjectDeeply(featureFlagModel?.getCurrentData());
        const newFeatureFlag = ObjectHelper.sortObjectDeeply(newModel?.getCurrentData());

        if (ObjectHelper.areObjectsEqualLodash(existingFeatureFlag, newFeatureFlag) === false) {
          setFeatureFlagModel({...newModel});
        }
      }
    }
  }, [featureFlagName, organizationSettingsRecord]);

  return ({
    featureFlagModel: featureFlagModel,
    setFeatureFlagModel: setFeatureFlagModel,
    isActive: featureFlagModel?.getData("active") === true,
  });
}
