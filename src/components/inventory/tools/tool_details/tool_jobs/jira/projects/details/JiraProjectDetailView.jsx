import React, {useContext} from "react";
import PropTypes from "prop-types";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {faProjectDiagram} from "@fortawesome/pro-light-svg-icons";
import JiraProjectsDetailPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectsDetailPanel";
import ActionBarDestructiveDeleteButton from "components/common/actions/buttons/ActionBarDestructiveDeleteButton";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";

function JiraProjectDetailView( {toolData, setToolData, jiraProjectData, setJiraProjectData, loadTool}) {
  const { getAccessToken } = useContext(AuthContext);
  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={`/inventory/tools/details/${toolData.getData("_id")}`} />
        </div>
        <div>
          <ActionBarDestructiveDeleteButton
            dataObject={jiraProjectData}
            relocationPath={`/inventory/tools/details/${toolData.getData("_id")}`}
            handleDelete={deleteJiraProject}
            deleteTopic={"Jira Project"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const deleteJiraProject = () => {
    let newToolData = {...toolData};
    let projects = toolData.getData("projects");
    const projectIndex = projects.findIndex((project) => project.id === jiraProjectData.getData("id"));

    console.log("found Project: " + JSON.stringify(projectIndex))
    if (projectIndex != null) {
      projects.splice(projectIndex, 1);
      newToolData.setData("projects", projects);
      console.log("found Project: " + JSON.stringify(projectIndex))
    }
    else {
      throw Error("Could not find Jira Project to delete.");
    }

    return toolsActions.updateTool(newToolData, getAccessToken);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolDetailView"}
      title={jiraProjectData != null ? `Jira Project Details [${jiraProjectData["name"]}]` : undefined}
      managementViewLink={"/inventory/tools"}
      managementTitle={toolData ? `Tool Details [${toolData.getData("_id")}]` : undefined}
      type={"Jira Project"}
      titleIcon={faProjectDiagram}
      dataObject={jiraProjectData}
      activeField={"active"}
      actionBar={getActionBar()}
      detailPanel={<JiraProjectsDetailPanel jiraProjectData={jiraProjectData} setJiraProjectData={setJiraProjectData} toolData={toolData} setToolData={setToolData} loadData={loadTool}/>}
    />
  )
}

JiraProjectDetailView.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  jiraProjectData: PropTypes.object,
  setJiraProjectData: PropTypes.func,
  loadTool: PropTypes.func,
};

export default JiraProjectDetailView;