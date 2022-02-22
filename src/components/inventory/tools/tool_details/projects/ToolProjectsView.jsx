import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import JiraProjectDetailView
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectDetailView";
import {jiraToolProjectMetadata} from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jiraToolProject.metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import ToolModel from "components/inventory/tools/tool.model";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";

function ToolProjectsView() {
  const { id, projectId } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [toolProjectData, setToolProjectData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      await getTool(cancelSource);
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTool = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, id);
    const tool = response?.data?.data;

    if (tool) {
      const toolDataDto = new ToolModel(tool, response?.data?.metadata, false);
      await setToolData(toolDataDto);
      await unpackToolProject(toolDataDto);
    }
  };

  const unpackToolProject = (toolDataDto) => {
    let toolProjects = toolDataDto.getData("projects");
    const metaData = getMetaData(toolDataDto.getData("tool_identifier"));

    if (toolProjects?.length > 0) {
      let projectData = toolProjects.find((project) => project._id === projectId);

      if (projectData != null) {
        let toolProjectDto = new Model({...projectData}, metaData, false);
        setToolProjectData(toolProjectDto);
      }
    }
  };

  const getMetaData = (toolIdentifier) => {
    switch (toolIdentifier) {
      case "jira":
        return jiraToolProjectMetadata;
    }
  };

  const getDetailView = () => {
    switch (toolData?.getData("tool_identifier")) {
      case "jira":
        return (
          <JiraProjectDetailView
            toolData={toolData}
            loadTool={getTool}
            isLoading={isLoading}
            jiraProjectData={toolProjectData}
            setJiraProjectData={setToolProjectData}
          />
        );
    }

    return (
      <DetailScreenContainer
        breadcrumbDestination={"toolProjectDetailView"}
        navigationTabContainer={<InventorySubNavigationBar currentTab={"toolProjectViewer"} />}
        isLoading={isLoading}
        dataObject={toolProjectData}
        metadata={getMetaData(toolData?.getData("tool_identifier"))}
      />
    );
  };

  return (getDetailView());
}
export default ToolProjectsView;