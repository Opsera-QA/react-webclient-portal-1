import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EcsClusterCreationActions from "components/tasks/details/tasks/ecs-cluster-creation/ecsClusterCreation.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsClusters(awsToolId, type, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [awsClusters, setAwsClusters] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setAwsClusters([]);

    if (
      isMongoDbId(awsToolId) === true
      && hasStringValue(type) === true
      && hasStringValue(region) === true
    ) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, type, region]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getClusters();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getClusters = async () => {
    const response = await awsActions.getClusters(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      type,
      region,
    );

    const clusters = DataParsingHelper.parseArray(response?.data?.data, []);
    setAwsClusters([...clusters]);
  };

  return ({
    awsClusters: awsClusters,
    setAwsClusters: setAwsClusters,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
