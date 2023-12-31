import React, {useEffect, useState, useContext, useRef} from "react";
import ArgoToolProjectsTable from "components/inventory/tools/tool_details/tool_jobs/argo/projects/ArgoToolProjectsTable";
import PropTypes from "prop-types";
import ArgoProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/details/ArgoProjectEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import argoProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-project-metadata";
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
function ArgoToolProjectsPanel({ toolId }) {
  const [argoProjects, setArgoProjects] = useState([]);
  const [argoOriginalProjects, setArgoOriginalProjects] = useState([]);
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
      await getArgoProjects(cancelSource);
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

  const getArgoProjects = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoProjectsV2(getAccessToken, cancelSource, toolId);
    const projects = response?.data?.data;

    if(isMounted?.current === true && Array.isArray(projects)){
      const sortedProjects = _.sortBy(projects, ["name"]);
      setArgoOriginalProjects(sortedProjects);
      setArgoProjects(localFilterFunction(searchFilter, sortedProjects, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
    }
  };

  const searchFilter = (project) => {
    const searchTerm = filterModel?.getFilterValue("search");
    return (
         stringIncludesValue(project?.name, searchTerm)
      || stringIncludesValue(project?.description, searchTerm)
    );
  };

  const filterData = () => {
    setArgoProjects(localFilterFunction(searchFilter, argoOriginalProjects, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
  };

  const onRowSelect = async (grid, row) => {
    try {
      setIsLoading(true);
      const response = await argoActions.getArgoProjectDetails(getAccessToken, cancelTokenSource, toolId, row?.name);
      const editObject = {
        name: response?.data?.data?.metadata?.name || "",
        description: response?.data?.data?.spec?.description || "",
        clusterResourceWhitelist: response?.data?.data?.spec?.clusterResourceWhitelist || [],
        destinations: response?.data?.data?.spec?.destinations || [],
        namespaceResourceBlacklist: response?.data?.data?.spec?.namespaceResourceBlacklist || [],
        namespaceResourceWhitelist: response?.data?.data?.spec?.namespaceResourceWhitelist || [],
        orphanedResources: response?.data?.data?.spec?.orphanedResources?.warn || false,
        sourceRepos: response?.data?.data?.spec?.sourceRepos || ["*"],
      };
      const argoToolProjectModel = modelHelpers.parseObjectIntoModel(editObject, argoProjectMetadata);
      setArgoModel({...argoToolProjectModel});
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

  const closePanel = () => {
    setArgoModel(null);
    loadData();
  };

  if (argoModel) {
    return (
      <ArgoProjectEditorPanel
        argoProjectData={argoModel}
        toolId={toolId}
        loadData={loadData}
        handleClose={closePanel}
      />
    );
  }

  return (
    <ArgoToolProjectsTable
      isLoading={isLoading}
      toolId={toolId}      
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoProjects={argoProjects}
      filterData={filterData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
    />
  );
}

ArgoToolProjectsPanel.propTypes = {
  toolId: PropTypes.string,  
};

export default ArgoToolProjectsPanel;
