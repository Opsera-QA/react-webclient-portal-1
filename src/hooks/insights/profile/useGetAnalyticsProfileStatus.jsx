import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useAnalyticsProfileActions from "hooks/insights/profile/useAnalyticsProfileActions";

export default function useGetAnalyticsProfileStatus(
  userData,
  handleErrorFunction,
) {
  const [areAnalyticsToolsEnabled, setAreAnalyticsToolsEnabled] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const analyticsProfileActions = useAnalyticsProfileActions();

  const onErrorFunction = (error) => {
    if (handleErrorFunction) {
      handleErrorFunction(error);
    }

    setAreAnalyticsToolsEnabled(false);
  };

  useEffect(() => {
    if (loadData) {
      loadData(getAnalyticsProfileStatus, onErrorFunction).catch(() => {});
    }
  }, [userData]);

  const getAnalyticsProfileStatus = async () => {
    if (userData == null) {
      return;
    }

    const response = await analyticsProfileActions.areAnalyticsToolsEnabled();
    const analyticsAreEnabled = DataParsingHelper.parseNestedBoolean(response, "data.areAnalyticsToolsEnabled", false);
    setAreAnalyticsToolsEnabled(analyticsAreEnabled);
  };

  return ({
    areAnalyticsToolsEnabled: areAnalyticsToolsEnabled,
    setAreAnalyticsToolsEnabled: setAreAnalyticsToolsEnabled,
    loadData: async () => loadData(async () => getAnalyticsProfileStatus(), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
