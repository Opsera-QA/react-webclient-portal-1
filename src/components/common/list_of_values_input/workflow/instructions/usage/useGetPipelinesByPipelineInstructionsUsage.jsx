import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineInstructionsActions} from "components/workflow/instructions/pipelineInstructions.actions";

export default function useGetPipelinesByPipelineInstructionsUsage(pipelineInstructionsId, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelines([]);

    if (isMongoDbId(pipelineInstructionsId) === true) {
      loadData().catch(() => {
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getPipelinesByPipelineInstructionsUsage();
    } catch (error) {
      setError(error);

      if (handleErrorFunction) {
        handleErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPipelinesByPipelineInstructionsUsage = async () => {
    const response = await pipelineInstructionsActions.getPipelinesByPipelineInstructionsUsage(
      getAccessToken,
      cancelTokenSource,
      pipelineInstructionsId,
    );

    setPipelines([...DataParsingHelper.parseArray(response?.data?.data, [])]);
  };

  return ({
    pipelines: pipelines,
    setPipelines: setPipelines,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
