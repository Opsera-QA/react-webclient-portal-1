import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsCloudProviderRegions(handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [cloudProviderRegions, setCloudProviderRegions] = useState([]);
  const {
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getAwsRegions();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAwsRegions = async () => {
    const response = await awsActions.getAwsRegionsV2(cancelTokenSource);
    const regions = DataParsingHelper.parseArray(response?.data?.data, []);
    setCloudProviderRegions([...regions]);
  };

  return ({
    cloudProviderRegions: cloudProviderRegions,
    setCloudProviderRegions: setCloudProviderRegions,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
