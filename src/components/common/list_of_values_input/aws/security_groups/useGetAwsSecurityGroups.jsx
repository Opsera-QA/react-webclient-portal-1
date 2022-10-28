import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";

export default function useGetAwsSecurityGroups(awsToolId, region, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [securityGroups, setSecurityGroups] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setSecurityGroups([]);

    if (isMongoDbId(awsToolId) && hasStringValue(region) === true) {
      loadData().catch(() => {
      });
    }
  }, [awsToolId, region]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getSecurityGroups();
    } catch (error) {
      setError(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSecurityGroups = async () => {
    const response = await awsActions.getSecurityGroups(
      getAccessToken,
      cancelTokenSource,
      awsToolId,
      region,
    );
    const awsSecurityGroups = DataParsingHelper.parseArray(response?.data?.data, []);
    setSecurityGroups([...awsSecurityGroups]);
  };

  return ({
    securityGroups: securityGroups,
    setSecurityGroups: setSecurityGroups,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
