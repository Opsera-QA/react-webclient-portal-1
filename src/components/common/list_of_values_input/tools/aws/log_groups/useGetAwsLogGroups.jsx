import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function useGetAwsLogGroups(
  awsToolId,
  awsRegion,
  handleErrorFunction,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [awsLogGroups, setAwsLogGroups] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    if (isMongoDbId(awsToolId) === true && hasStringValue(awsRegion) === true) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, awsRegion]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getAwsLogGroups();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAwsLogGroups = async () => {
    const response = await awsActions.getLogGroups(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      awsRegion,
    );

    const logGroups = DataParsingHelper.parseArray(response?.data?.data, []);
    setAwsLogGroups([...logGroups]);
  };

  return ({
    awsLogGroups: awsLogGroups,
    setAwsLogGroups: setAwsLogGroups,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
