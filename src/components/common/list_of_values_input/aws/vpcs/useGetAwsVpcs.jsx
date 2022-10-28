import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsVpcs(awsToolId, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [vpcs, setVpcs] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setVpcs([]);

    if (isMongoDbId(awsToolId) && hasStringValue(region) === true) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, region]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getVpcs();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getVpcs = async () => {
    const response = await awsActions.getVpcs(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      region,
    );
    const awsVcps = DataParsingHelper.parseArray(response?.data?.data, []);
    setVpcs([...awsVcps]);
  };

  return ({
    vpcs: vpcs,
    setVpcs: setVpcs,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
