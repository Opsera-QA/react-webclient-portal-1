import { useEffect, useState, useContext } from "react";
import {AuthContext} from "contexts/AuthContext";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGithubActions from "hooks/tools/github/useGithubActions";
import axios from "axios";

export default function useGetGithubRepositories(
  inEditMode = true,
  toolId,
  handleErrorFunction,
) {
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {getAccessToken} = useContext(AuthContext);
  const { error, setError, loadData } = useLoadData();
  const githubActions = useGithubActions();

  useEffect(() => {
    setGithubRepositories([]);

    if (inEditMode === true && isMongoDbId(toolId) === true && loadData) {
      loadData(getRepositories, handleErrorFunction).catch(() => {});
    }
  }, [inEditMode, toolId]);

  const getRepositories = async (searchTerm = "") => {
    setIsLoading(true);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    if (isMongoDbId(toolId) !== true) {
      return;
    }

    const response = await githubActions.getGithubRepositories(
      getAccessToken, 
      source,
      toolId,
      searchTerm,
    );
    const repositories = await DataParsingHelper.parseNestedArray(response, "data.data", []);
    setGithubRepositories([...repositories]);

    if (response) {
      setIsLoading(false);
    }
    
        return () => {
      source.cancel();
    };
  };

  return ({
    githubRepositories: githubRepositories,
    setGithubRepositories: setGithubRepositories,
    loadData: (searchTerm, cancelSource) => loadData(() => getRepositories(searchTerm, cancelSource), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
