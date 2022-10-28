import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EcsClusterCreationActions from "components/tasks/details/tasks/ecs-cluster-creation/ecsClusterCreation.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function useGetAwsEcsInstanceTypes(imageType, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error  , setError] = useState(undefined);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setInstanceTypes([]);

    if (hasStringValue(imageType) === true) {
      loadData().catch(() => {
      });
    }
  }, [imageType]);

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
    const response = await EcsClusterCreationActions.getEc2ImageTypes(
      getAccessToken,
      cancelTokenSource,
      imageType,
    );
    const types = DataParsingHelper.parseArray(response?.data?.data, []);
    setInstanceTypes([...types]);
  };

  return ({
    instanceTypes: instanceTypes,
    setInstanceTypes: setInstanceTypes,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
