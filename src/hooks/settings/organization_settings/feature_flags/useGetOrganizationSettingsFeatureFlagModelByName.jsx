import {useContext, useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import {AuthContext} from "contexts/AuthContext";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function useGetOrganizationSettingsFeatureFlagModelByName(
  featureFlagName,
) {
  const [featureFlagModel, setFeatureFlagModel] = useState(undefined);
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const {
    isLoading,
    error,
    setError,
  } = useLoadData();
  const { organizationSettingsRecord } = useContext(AuthContext);

  useEffect(() => {
    setFeatureFlagModel(undefined);

    if (hasStringValue(featureFlagName) === true) {
      const featureFlags = DataParsingHelper.parseNestedObject(organizationSettingsRecord, "features", []);
      const foundFeatureFlag = DataParsingHelper.parseObject(featureFlags.find((featureFlag) => featureFlag?.name === featureFlagName));

      if (foundFeatureFlag) {
        const newModel = getFeatureFlagModel(
          foundFeatureFlag,
          false,
        );
        setFeatureFlagModel({...newModel});
      }
    }
  }, [featureFlagName, organizationSettingsRecord]);

  return ({
    featureFlagModel: featureFlagModel,
    setFeatureFlagModel: setFeatureFlagModel,
    error: error,
    setError: setError,
    isLoading: isLoading,
  });
}
