import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EcsClusterCreationActions from "components/tasks/details/tasks/ecs-cluster-creation/ecsClusterCreation.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsLoadBalancers(awsToolId, vpcId, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [loadBalancers, setLoadBalancers] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setLoadBalancers([]);

    if (
      isMongoDbId(awsToolId) === true
      && hasStringValue(region) === true
      && hasStringValue(vpcId) === true
    ) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, region, vpcId]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getLoadBalancers();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getLoadBalancers = async () => {
    const response = await awsActions.getLoadBalancers(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      vpcId,
      region,
    );
    const awsLoadBalancers = DataParsingHelper.parseArray(response?.data?.data, []);
    setLoadBalancers([...awsLoadBalancers]);
  };

  return ({
    loadBalancers: loadBalancers,
    setLoadBalancers: setLoadBalancers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
