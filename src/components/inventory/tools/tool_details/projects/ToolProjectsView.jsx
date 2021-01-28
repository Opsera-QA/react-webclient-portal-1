import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import JiraProjectDetailView
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectDetailView";
import jiraProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jira-project-metadata";
import toolsActions from "components/inventory/tools/tools-actions";

function ToolProjectsView() {
  const { id, projectId } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [toolProjectData, setToolProjectData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getTool();
  }, []);

  const getTool = async () => {
    try {
      setIsLoading(true);
      const response = await toolsActions.getRoleLimitedToolById(id, getAccessToken);

      if (response?.data?.data[0]) {
        const toolDataResponse = response?.data?.data[0];
        if (toolDataResponse) {
          const toolDataDto = new Model(toolDataResponse, toolMetadata, false);
          await setToolData(toolDataDto);
          await unpackToolProject(toolDataDto);
        }
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const unpackToolProject = (toolDataDto) => {
    let toolProjects = toolDataDto.getData("projects");
    const metaData = getMetaData(toolDataDto.getData("tool_identifier"));

    if (toolProjects?.length > 0) {
      let projectData = toolProjects.find((project) => project.id === projectId);

      if (projectData != null) {
        let toolProjectDto = new Model({...projectData}, metaData, false);
        setToolProjectData(toolProjectDto);
      }
    }
  };

  const getMetaData = (toolIdentifier) => {
    switch (toolIdentifier) {
      case "jira":
        return jiraProjectMetadata;
    }
  };

  const getDetailView = () => {
    switch (toolData.getData("tool_identifier")) {
      case "jira":
        return <JiraProjectDetailView toolData={toolData} loadTool={getTool} jiraProjectData={toolProjectData} setJiraProjectData={setToolProjectData} />;
    }
  };

  if (isLoading) {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"toolProjectDetailView"}
        isLoading={isLoading}
        dataObject={toolProjectData}
        metadata={getMetaData(toolData?.getData("tool_identifier"))}
      />
    );
  }

  if (toolData == null) {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"toolProjectDetailView"}
        isLoading={isLoading}
        dataObject={toolData}
        metadata={toolMetadata}
      />
    );
  }


  if (toolProjectData == null) {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"toolProjectDetailView"}
        isLoading={isLoading}
        dataObject={toolProjectData}
        metadata={getMetaData(toolData?.getData("tool_identifier"))}
      />
    );
  }

  return (getDetailView());
}
export default ToolProjectsView;