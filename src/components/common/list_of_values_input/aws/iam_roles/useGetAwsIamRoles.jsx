import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EcsClusterCreationActions from "components/tasks/details/tasks/ecs-cluster-creation/ecsClusterCreation.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsIamRoles(awsToolId, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [awsIamRoles, setAwsIamRoles] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setAwsIamRoles([]);

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
    const response = await awsActions.getIamRoles(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      region,
    );
    const roles = DataParsingHelper.parseArray(response?.data?.data, []);
    setAwsIamRoles([...roles]);
  };

  return ({
    awsIamRoles: awsIamRoles,
    setAwsIamRoles: setAwsIamRoles,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
