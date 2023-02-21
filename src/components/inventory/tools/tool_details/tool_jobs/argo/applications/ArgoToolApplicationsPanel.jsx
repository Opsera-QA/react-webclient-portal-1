import React, {useContext, useEffect, useRef, useState} from "react";
import ArgoApplicationsTable from "./ArgoApplicationsTable";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import {AuthContext} from "contexts/AuthContext";
import ArgoApplicationEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/details/ArgoApplicationEditorPanel";
import argoFiltersMetadata from "../argo-filters-metadata";
import Model from "core/data_model/model";
import {stringIncludesValue} from "components/common/helpers/string-helpers";
import {localFilterFunction} from "utils/tableHelpers";
import _ from "lodash";

function ArgoToolApplicationsPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [argoApplications, setArgoApplications] = useState([]);
  const [argoOriginalApplications, setArgoOriginalApplications] = useState([]);
  const [selectedArgoApplication, setSelectedArgoApplication] = useState(undefined);

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
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
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
      await getArgoApplications(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getArgoApplications = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoApplicationsV2(getAccessToken, cancelSource, toolData?.getData("_id"));
    const applications = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(applications)) {
      const sortedApplications = _.sortBy(applications, ["name", "namespace"]);
      setArgoOriginalApplications(sortedApplications);
      setArgoApplications(localFilterFunction(searchFilter, sortedApplications, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
    }
  };

  const searchFilter = (application) => {
    const searchTerm = filterModel?.getFilterValue("search");
    return (
         stringIncludesValue(application?.name, searchTerm)
      || stringIncludesValue(application?.namespace, searchTerm)
    );
  };

  const filterData = () => {
    setArgoApplications(localFilterFunction(searchFilter, argoOriginalApplications, filterModel, setFilterModel, prevSearchKeyword, setPrevSearchKeyword));
  };

  const closeEditorPanel = async () => {
    setSelectedArgoApplication(undefined);
    await loadData();
  };

  if (selectedArgoApplication != null) {
    return (
      <ArgoApplicationEditorPanel
        loadData={loadData}
        handleClose={closeEditorPanel}
        toolData={toolData}
        argoApplicationData={selectedArgoApplication}
        applicationName={selectedArgoApplication?.getData("name")}
      />
    );
  }

  return (
    <ArgoApplicationsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      argoApplications={argoApplications}
      setSelectedArgoApplication={setSelectedArgoApplication}
      filterData={filterData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
    />
  );
}

ArgoToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
};
export default ArgoToolApplicationsPanel;
