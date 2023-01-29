import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

export default function useGetPipelineAppliedTags(
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
      loadData(getUniqueAppliedTagsForPipelineFilter, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getUniqueAppliedTagsForPipelineFilter = async () => {
    const response = await pipelineActions.getUniqueAppliedTagsForPipelineFilter();
    const newTags = DataParsingHelper.parseNestedArray(response, "data.data", []);
    console.log("newTags: " + JSON.stringify(newTags));
    setTags([...newTags]);
  };

  return ({
    tags: tags,
    setTags: setTags,
    loadData: () => getUniqueAppliedTagsForPipelineFilter(),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
