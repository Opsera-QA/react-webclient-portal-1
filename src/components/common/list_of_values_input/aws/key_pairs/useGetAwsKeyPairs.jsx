import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsKeyPairs(awsToolId, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [keyPairs, setKeyPairs] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setKeyPairs([]);

    if (isMongoDbId(awsToolId) && hasStringValue(region) === true) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, region]);

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
    const response = await awsActions.getKeyPairs(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      region,
    );
    const pairs = DataParsingHelper.parseArray(response?.data?.data, []);
    setKeyPairs([...pairs]);
  };

  return ({
    keyPairs: keyPairs,
    setKeyPairs: setKeyPairs,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
