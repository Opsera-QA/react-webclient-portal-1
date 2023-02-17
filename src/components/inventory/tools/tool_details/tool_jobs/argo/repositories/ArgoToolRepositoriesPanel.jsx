import React, {useEffect, useState, useContext, useRef} from "react";
import ArgoToolRepositoriesTable from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoToolRepositoriesTable";
import PropTypes from "prop-types";
import ArgoToolRepositoryEditorPanel from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/ArgoToolRepositoryEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoRepositoryMetadata from "../argo-repository-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import argoFiltersMetadata from "../argo-filters-metadata";
import Model from "core/data_model/model";
import {stringIncludesValue} from "components/common/helpers/string-helpers";
import {localFilterFunction} from "utils/tableHelpers";
import _ from "lodash";

// TODO: This whole section is very old and needs to be updated to current standards.
function ArgoToolRepositoriesPanel({ toolId }) {
  const [argoRepositories, setArgoRepositories] = useState([]);
  const [argoOriginalRepositories, setArgoOriginalRepositories] = useState([]);
  const [argoModel, setArgoModel] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [prevSearchKeyword, setPrevSearchKeyword] = useState("");
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...argoFiltersMetadata.newObjectFields },
      argoFiltersMetadata,
      false
    )
  );

  useEffect(() => {
    if(cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(cancelTokenSource).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getArgoRepositories(cancelSource);
    } catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const getArgoRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoRepositories(getAccessToken, cancelSource, toolId);
    const repositories = response?.data?.data;

    if(isMounted?.current === true && Array.isArray(repositories)){
      const sortedRepositories = _.sortBy(repositories, ["name", "project"]);
      setArgoOriginalRepositories(sortedRepositories);
      setArgoRepositories(localFilterFunction(searchFilter, sortedRepositories, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
    }
  };

  const searchFilter = (repository) => {
    const searchTerm = filterModel?.getFilterValue("search");
    return (
         stringIncludesValue(repository?.name, searchTerm)
      || stringIncludesValue(repository?.project, searchTerm)
      || stringIncludesValue(repository?.repo, searchTerm)
    );
  };

  const filterData = () => {
    setArgoRepositories(localFilterFunction(searchFilter, argoOriginalRepositories, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
  };

  const onRowSelect = (grid, row) => {
    const argoRepositoryModel = modelHelpers.parseObjectIntoModel(row, argoRepositoryMetadata);    
    setArgoModel({...argoRepositoryModel});
  };

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoToolRepositoryEditorPanel
        argoRepositoryData={argoModel}
        toolId={toolId}
        handleClose={closePanel}
      />
    );
  }

  return (
    <ArgoToolRepositoriesTable
      isLoading={isLoading}
      toolId={toolId}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoRepositories={argoRepositories}
      filterData={filterData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
    />
  );
}

ArgoToolRepositoriesPanel.propTypes = {
  toolId: PropTypes.string,
};

export default ArgoToolRepositoriesPanel;
