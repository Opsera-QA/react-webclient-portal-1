import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import commonActions from "components/common/common.actions";

export default function useGetFeatureFlags(
  handleErrorFunction,
) {
  const [featureFlags, setFeatureFlags] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setFeatureFlags(undefined);
    loadData(getFeatureFlags, handleErrorFunction).catch(() => {
    });
  }, []);

  const getFeatureFlags = async () => {
    const response = await commonActions.getFeatureFlagsV2(
      getAccessToken,
      cancelTokenSource,
    );
    setFeatureFlags(DataParsingHelper.parseObject(response?.data, {}));
  };

  return ({
    featureFlags: featureFlags,
    setFeatureFlags: setFeatureFlags,
    enabledServices: DataParsingHelper.parseObject(featureFlags?.enabledServices, {}),
    orchestrationFeatureFlags: DataParsingHelper.parseObject(featureFlags?.orchestration, {}),
    loadData: () => loadData(getFeatureFlags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
