import { useEffect, useState } from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";

export default function useGetFeatureFlagModelByName(
  featureFlagName,
) {
  const [featureFlagModel, setFeatureFlagModel] = useState(undefined);
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const featureFlagAdministrationActions = useFeatureFlagAdministrationActions();

  useEffect(() => {
    setFeatureFlagModel(undefined);

    if (featureFlagConstants.isFeatureFlagNameValid(featureFlagName) === true) {
      loadData(getFeatureFlag).catch(() => {
      });
    }
  }, [featureFlagName]);

  const getFeatureFlag = async () => {
    const response = await featureFlagAdministrationActions.getFeatureFlagByName(
      featureFlagName,
    );

    const featureFlag = DataParsingHelper.parseNestedObject(response, "data.data");

    if (featureFlag) {
      const newModel = getFeatureFlagModel(
        featureFlag,
        false,
      );
      setFeatureFlagModel({ ...newModel });
    }
  };

  return ({
    featureFlagModel: featureFlagModel,
    setFeatureFlagModel: setFeatureFlagModel,
    error: error,
    setError: setError,
    loadData: () => loadData(getFeatureFlag),
    isLoading: isLoading,
  });
}
