import React, {useContext, useEffect, useRef, useState} from "react";
import OctopusApplicationsTable from "./OctopusApplicationsTable";
import OctopusApplicationWrapper from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/OctopusApplicationWrapper";
import PropTypes from "prop-types";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import Model from "core/data_model/model";
import axios from "axios";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import octopusActions from "components/inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";

function OctopusToolApplicationsPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const [octopusApplications, setOctopusApplications] = useState([]);
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [applicationId, setApplicationId] = useState(undefined);
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
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
      await getOctopusApplications(filterDto, cancelSource);
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

  const getOctopusApplications = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await octopusActions.getOctopusApplicationsV2(getAccessToken, cancelSource, toolData?.getData("_id"));
    const applications = response?.data?.data;
    // const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && Array.isArray(applications)) {
      setOctopusApplications([...applications]);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  const onRowSelect = (rowData) => {
    const application = rowData?.original;
    const newApplicationModel = new Model(application?.configuration, octopusApplicationsMetadata, false);
    setApplicationId(application?._id);
    setOctopusApplicationData({...newApplicationModel});
  };

  const getView = () => {
    if (octopusApplicationData != null) {
      return (
        <OctopusApplicationWrapper
          type={octopusApplicationData?.getData("type")}
          toolData={toolData}
          isMounted={isMounted}
          loadData={loadData}
          appID={applicationId}
          octopusApplicationDataObj={octopusApplicationData}
          handleClose={() => setOctopusApplicationData(undefined)}
        />
      );
    }

    return (
      <OctopusApplicationsTable
        isLoading={isLoading}
        toolData={toolData}
        loadData={loadData}
        isMounted={isMounted}
        applications={octopusApplications}
        onRowSelect={onRowSelect}
        octopusApplicationData={octopusApplicationData}
      />
    );
  };

  return (
    <div>
      {getView()}
    </div>
  );
}

OctopusToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default OctopusToolApplicationsPanel;
