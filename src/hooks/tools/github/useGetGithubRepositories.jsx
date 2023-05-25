import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGithubActions from "hooks/tools/github/useGithubActions";

export default function useGetGithubRepositories(
  inEditMode = true,
  toolId,
  handleErrorFunction,
) {
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    error,
    setError,
    loadData,
  } = useLoadData();
  const githubActions = useGithubActions();

  useEffect(() => {
    setGithubRepositories([]);

    if (inEditMode === true && isMongoDbId(toolId) === true && loadData) {
      loadData(getRepositories, handleErrorFunction).catch(() => {});
    }
  }, [inEditMode, toolId]);

  const getRepositories = async (searchTerm = "") => {
    if (isMongoDbId(toolId) !== true) {
      return;
    }

    setIsLoading(true);
    const response = await githubActions.getGithubRepositories(
      toolId,
      searchTerm,
    );
    const repositories = await DataParsingHelper.parseNestedArray(response, "data.data", []);
    setGithubRepositories([...repositories]);

    if (response) {
      setIsLoading(false);
    }
  };

  return ({
    githubRepositories: githubRepositories,
    setGithubRepositories: setGithubRepositories,
    loadData: (searchTerm) => loadData(() => getRepositories(searchTerm), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
