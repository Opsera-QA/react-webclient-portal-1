import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePlatformSettingsActions from "hooks/platform/settings/usePlatformSettingsActions";

export default function useGetActivePlatformSettingsRecord(
  userData,
  handleErrorFunction,
) {
  const [platformSettingsRecord, setPlatformSettingsRecord] = useState(undefined);
  const platformSettingsActions = usePlatformSettingsActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPlatformSettingsRecord(undefined);
    loadData(getActivePlatformSettingsRecord, handleErrorFunction).catch(() => {
    });
  }, [userData]);

  const getActivePlatformSettingsRecord = async () => {
    setPlatformSettingsRecord(undefined);

    if (userData == null) {
      return null;
    }

    const response = await platformSettingsActions.getActivePlatformSettings();
    console.log("response: " + JSON.stringify(response));
    const platformSettings = DataParsingHelper.parseNestedObject(response, "data.data", []);

    if (platformSettings) {
      setPlatformSettingsRecord({...platformSettings});
    }
  };

  return ({
    platformSettingsRecord: platformSettingsRecord,
    setPlatformSettingsRecord: setPlatformSettingsRecord,
    loadData: () => loadData(getActivePlatformSettingsRecord, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
