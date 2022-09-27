import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import JiraProjectDetailView
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectDetailView";
import {jiraToolProjectMetadata} from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jiraToolProject.metadata";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import useGetRegistryToolModelById from "components/inventory/tools/hooks/useGetRegistryToolModelById";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ToolProjectsView() {
  const { id, projectId } = useParams();
  const [toolProjectData, setToolProjectData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    toolModel,
    setToolModel,
    loadData,
  } = useGetRegistryToolModelById(id);

  useEffect(() => {
    unpackToolProject();
  }, [toolModel, projectId]);

  const unpackToolProject = () => {
    if (!toolModel || isMongoDbId(projectId) !== true) {
      setToolProjectData(undefined);
      return;
    }

    let toolProjects = toolModel?.getData("projects");
    const metaData = getMetaData(toolModel.getData("tool_identifier"));

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
    switch (toolModel?.getData("tool_identifier")) {
      case "jira":
        return (
          <JiraProjectDetailView
            toolData={toolModel}
            loadTool={loadData}
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
        metadata={getMetaData(toolModel?.getData("tool_identifier"))}
      />
    );
  };

  return (getDetailView());
}
export default ToolProjectsView;