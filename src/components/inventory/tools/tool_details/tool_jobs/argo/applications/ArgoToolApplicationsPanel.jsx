import React, {useContext, useEffect, useRef, useState} from "react";
import ArgoApplicationsTable from "./ArgoApplicationsTable";
import PropTypes from "prop-types";
import ArgoApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/ArgoApplicationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import {AuthContext} from "contexts/AuthContext";

function ArgoToolApplicationsPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  // TODO: Replace with actual filter model for this area OR make generic one
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
  const [isLoading, setIsLoading] = useState(false);
  const [argoApplications, setArgoApplications] = useState([]);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(parameterFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getArgoApplications(filterDto, cancelSource);
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

  const getArgoApplications = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoToolApplicationsV2(getAccessToken, cancelSource, toolData?.getData("_id"));
    const applications = response?.data?.data;
    // const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && Array.isArray(applications)) {
      // setArgoApplications([...applications]);
      unpackApplications(applications);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  // TODO: This is a current workaround until I can refactor the area further.
  const unpackApplications = (toolActions) => {
    const newApplicationList = [];

    //TODO: Don't unpack these objects and instead just use the main ones.
    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let application = toolAction?.configuration;
        application = {...application, applicationId: toolAction?._id};
        application = {...application, index: index};
        newApplicationList?.push(application);
      });
    }

    setArgoApplications(newApplicationList);
  };

  const onRowSelect = (grid, row) => {
    let selectedRow = toolData?.getArrayData("actions")[row?.index];
    toastContext.showOverlayPanel(
      <ArgoApplicationOverlay
        argoDataObject={selectedRow?.configuration}
        applicationId={selectedRow?._id}
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  return (
    <ArgoApplicationsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoApplications={argoApplications}
    />
  );
}

ArgoToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
};
export default ArgoToolApplicationsPanel;
