import React, {useContext, useEffect, useRef, useState} from "react";
import OctopusApplicationsTable from "./OctopusApplicationsTable";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";
import PropTypes from "prop-types";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import Model from "core/data_model/model";
import axios from "axios";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import octopusActions from "components/inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";

// TODO: Pass in applications
function OctopusToolApplicationsPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const [octopusApplications, setOctopusApplications] = useState([]);
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);
  const [showCreateOctopusApplicationModal, setShowCreateOctopusApplicationModal] = useState(false);
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

  const selectedJobRow = (rowData) => {
    const currentApplications = toolData?.getData("actions");
    const applicationIndex = rowData?.index;

    if (Array.isArray(currentApplications) && currentApplications.length > 0 && typeof applicationIndex === "number") {
      const application = currentApplications[applicationIndex];
      const newApplicationModel =  new Model(application?.configuration, octopusApplicationsMetadata, false);
      setApplicationId(application?._id);
      setOctopusApplicationData({...newApplicationModel});
      setShowCreateOctopusApplicationModal(true);
    }
  };

  // TODO: Convert to overlay
  const getApplicationModel = () => {
    if (octopusApplicationData != null) {
      return (
        <ExistingOctopusApplicationModal
          type={octopusApplicationData.getData("type")}
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateOctopusApplicationModal}
          octopusApplicationDataObj={octopusApplicationData}
          showModal={showCreateOctopusApplicationModal}
          appID={applicationId}
        />
      );
    }
  };

  return (
    <>
      <div>
        <OctopusApplicationsTable
          isLoading={isLoading}
          toolData={toolData}
          loadData={loadData}
          applications={octopusApplications}
          selectedRow={(rowData) => selectedJobRow(rowData)}
          octopusApplicationData={octopusApplicationData}
        />
      </div>
      {getApplicationModel()}
    </>
  );
}

OctopusToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default OctopusToolApplicationsPanel;
