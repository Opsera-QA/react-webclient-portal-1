import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePlatformSettingsActions from "hooks/platform/settings/usePlatformSettingsActions";

export default function useGetPlatformSettingsRecordForUser(
  userData,
  handleErrorFunction,
) {
  const [platformSettingsFeatureFlag, setPlatformSettingsFeatureFlag] = useState(undefined);
  const platformSettingsActions = usePlatformSettingsActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPlatformSettingsFeatureFlag(undefined);
    loadData(getPlatformSettingsRecord, handleErrorFunction).catch(() => {
    });
  }, []);

  const getPlatformSettingsRecord = async () => {
    setPlatformSettingsFeatureFlag(undefined);
    const response = await platformSettingsActions.getPlatformSettings();
    const featureFlag = DataParsingHelper.parseNestedObject(response, "data.data", []);

    if (featureFlag) {
      setPlatformSettingsFeatureFlag({...featureFlag});
    }
  };

  return ({
    platformSettingsFeatureFlag: platformSettingsFeatureFlag,
    setPlatformSettingsFeatureFlag: setPlatformSettingsFeatureFlag,
    loadData: () => loadData(getPlatformSettingsRecord, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
