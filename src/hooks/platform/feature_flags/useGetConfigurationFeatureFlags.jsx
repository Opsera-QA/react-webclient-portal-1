import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useConfigurationFeatureFlagActions from "hooks/platform/feature_flags/useConfigurationFeatureFlagActions";

export default function useGetConfigurationFeatureFlags(
  userData,
  handleErrorFunction,
) {
  const [featureFlags, setFeatureFlags] = useState(undefined);
  const configurationFeatureFlagActions = useConfigurationFeatureFlagActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setFeatureFlags(undefined);
    loadData(getConfigurationFeatureFlags, handleErrorFunction).catch(() => {
    });
  }, [userData]);

  const getConfigurationFeatureFlags = async () => {
    setFeatureFlags(undefined);

    if (userData == null) {
      return null;
    }

    const response = await configurationFeatureFlagActions.getConfigurationFeatureFlags();
    const configurationFeatureFlags = DataParsingHelper.parseNestedObject(response, "data");

    if (configurationFeatureFlags) {
      setFeatureFlags({...configurationFeatureFlags});
    }
  };

  return ({
    featureFlags: featureFlags,
    setFeatureFlags: setFeatureFlags,
    loadData: () => loadData(getConfigurationFeatureFlags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
