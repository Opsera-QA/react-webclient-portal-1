import React, { useContext, useEffect, useRef, useState } from "react";
import SnaplogicProjectsTable from "./SnaplogicProjectsTable";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import SnaplogicProjectEditorPanel from "./details/SnaplogicProjectEditorPanel";
import snaplogicToolActions from "../snaplogic-tool-actions";

function SnaplogicProjectsPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  // TODO: Replace with actual filter model for this area OR make generic one
  const [parameterFilterModel, setParameterFilterModel] = useState(
    new ParameterFilterModel(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toolProjects, setToolProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState(undefined);

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

  const loadData = async (
    filterDto = parameterFilterModel,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await getProjects(filterDto, cancelSource);
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

  const getProjects = async (
    filterDto = parameterFilterModel,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await snaplogicToolActions.getSnaplogicProjects(
      getAccessToken,
      cancelSource,
      toolData?.getData("_id"),
    );
    const projects = response?.data?.data;
    // const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && Array.isArray(projects)) {
      setToolProjects([...projects]);
      unpackProjects(projects);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  const unpackProjects = (projects) => {
    const newList = [];
    if (Array.isArray(projects)) {
      projects.forEach((proj, index) => {
        let project = proj.configuration;
        project = { ...project, projectId: project?._id };
        project = { ...project, index: index };
        newList?.push(project);
      });
    }

    setProjects(newList);
  };

  const closeEditorPanel = async () => {
    setSelectedProj(undefined);
    await loadData();
  };

  if (selectedProj != null) {
    return (
      <SnaplogicProjectEditorPanel
        loadData={loadData}
        handleClose={closeEditorPanel}
        toolData={toolData}
        pmdRuleData={selectedProj}
        projectId={selectedProj?.getData("projectId")}
      />
    );
  }

  return (
    <SnaplogicProjectsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      projects={projects}
      setSelectedProj={setSelectedProj}
      toolProjects={toolProjects}
    />
  );
}

SnaplogicProjectsPanel.propTypes = {
  toolData: PropTypes.object,
};
export default SnaplogicProjectsPanel;
