import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

export default function useGetPipelineAppliedToolIdentifiers(
  handleErrorFunction,
) {
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setToolIdentifiers([]);

    if (loadData) {
      loadData(getUniqueAppliedToolIdentifiersForPipelineFilter, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getUniqueAppliedToolIdentifiersForPipelineFilter = async () => {
    const response = await pipelineActions.getUniqueToolIdentifiersByPipelineUsageForFilter();
    const newTags = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setToolIdentifiers([...newTags]);
  };

  return ({
    toolIdentifiers: toolIdentifiers,
    setToolIdentifiers: setToolIdentifiers,
    loadData: () => getUniqueAppliedToolIdentifiersForPipelineFilter(),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
