import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsSubnets(awsToolId, vpcId, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [subnets, setSubnets] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setSubnets([]);

    if (isMongoDbId(awsToolId) && hasStringValue(vpcId) === true) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, vpcId]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getSubnets();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSubnets = async () => {
    const response = await awsActions.getSubnets(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      vpcId,
    );
    const subnetList = DataParsingHelper.parseArray(response?.data?.data, []);
    setSubnets([...subnetList]);
  };

  return ({
    subnets: subnets,
    setSubnets: setSubnets,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
