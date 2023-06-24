import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

export default function useGetPipelineStepAppliedTags(
  handleErrorFunction,
) {
  const [tags, setTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setTags([]);

    if (loadData) {
      loadData(getUniqueAppliedTagsForPipelineStepsFilter, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getUniqueAppliedTagsForPipelineStepsFilter = async () => {
    const response = await pipelineActions.getUniqueAppliedTagsForPipelineStepsFilter();
    const newTags = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setTags([...newTags]);
  };

  return ({
    tags: tags,
    setTags: setTags,
    loadData: loadData(getUniqueAppliedTagsForPipelineStepsFilter, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
