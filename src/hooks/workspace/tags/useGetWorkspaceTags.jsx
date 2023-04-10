import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useWorkspaceActions from "hooks/workspace/useWorkspaceActions";

export default function useGetWorkspaceTags(handleErrorFunction) {
  const workspaceActions = useWorkspaceActions();
  const [allTags, setAllTags] = useState([]);
  const [pipelineTags, setPipelineTags] = useState([]);
  const [taskTags, setTaskTags] = useState([]);
  const [toolTags, setToolTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAllTags([]);

    if (loadData) {
      loadData(getWorkspaceTags, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getWorkspaceTags = async () => {
    setAllTags([]);
    setPipelineTags([]);
    setTaskTags([]);
    setToolTags([]);
    const response = await workspaceActions.getTagsByWorkspaceUsage();
    setAllTags(DataParsingHelper.parseNestedArray(response, "data.data.allTags", []));
    setPipelineTags(DataParsingHelper.parseNestedArray(response, "data.data.pipelineTags", []));
    setTaskTags(DataParsingHelper.parseNestedArray(response, "data.data.taskTags", []));
    setToolTags(DataParsingHelper.parseNestedArray(response, "data.data.toolTags", []));
  };

  return ({
    allTags: allTags,
    pipelineTags: pipelineTags,
    taskTags: taskTags,
    toolTags: toolTags,
    loadDataFunction: () => loadData(getWorkspaceTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
