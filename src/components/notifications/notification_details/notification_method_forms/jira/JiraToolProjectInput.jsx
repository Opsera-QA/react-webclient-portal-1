import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import JiraUserInputs
  from "components/notifications/notification_details/notification_method_forms/jira/JiraUserInputs";
import {faProjectDiagram} from "@fortawesome/pro-light-svg-icons";
import JiraToolProjectField from "components/common/fields/inventory/tools/jira/JiraToolProjectField";
import toolsActions from "components/inventory/tools/tools-actions";

function JiraToolProjectInput({jiraToolId, fieldName, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [selectedJiraProject, setSelectedJiraProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjects([]);
    if (jiraToolId !== "") {
      loadData();
    }
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadProjects();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    const response = await toolsActions.getFullToolById(jiraToolId, getAccessToken);

    let toolProjects = response?.data[0]?.projects;
    if (toolProjects) {
      let projectId = dataObject.getData(fieldName);
      if (projectId !== "") {
        let toolProject = toolProjects.find((project) => {
          return project.id === projectId;
        });
        if (toolProject) {
          setSelectedJiraProject(toolProject);
        }
      }
      setProjects(toolProjects);
    }
  };

  const setJiraProject = (fieldName, jiraProject) => {
    let newDataObject = {...dataObject};
    setSelectedJiraProject(jiraProject);
    newDataObject.setData("toolProjectId", jiraProject["id"]);
    newDataObject.setData("jiraPrimaryAssignee", "");
    newDataObject.setData("jiraSecondaryAssignees", []);
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Tool Projects";
    }

    if (jiraToolId === "") {
      return "A Jira Tool must be selected before selecting Jira Tool Project";
    }

    if (!isLoading && jiraToolId !== "" && projects.length === 0) {
      return "No Jira Tool Projects found for selected Jira Tool.";
    }
  };

  const getJiraToolProjectInfo = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <div className="d-flex mx-2 justify-content-between">
          <Link to={`/inventory/tools/details/${jiraToolId}/projects/${dataObject.getData(fieldName)}`}>
            <small><FontAwesomeIcon icon={faProjectDiagram} className="pr-1"/>View Or Edit this Tool Project&lsquo;s settings</small>
          </Link>
          <small className="form-text text-muted">
            <div>This will pull Jira Project, Board, Sprint, and Parent Ticket for one easy to update location</div>
          </small>
        </div>
      );
    }

    return <span>Select a tool project to get started.</span>;
  };

  const getJiraProject = () => {
    if (selectedJiraProject?.configuration) {
      return selectedJiraProject.configuration.jiraProject;
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setJiraProject}
        selectOptions={projects}
        busy={isLoading}
        valueField="id"
        textField="name"
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading || jiraToolId === "" || projects.length === 0}
      />
      {getJiraToolProjectInfo()}
      <div className="mx-2">
        <JiraToolProjectField fieldName={fieldName} dataObject={dataObject} jiraToolId={dataObject.getData("jiraToolId")} jiraToolProjectId={dataObject.getData(fieldName)} title={"Jira Tool Project"}/>
      </div>
      <JiraUserInputs jiraToolId={jiraToolId} jiraProject={getJiraProject()} dataObject={dataObject} setDataObject={setDataObject} />
    </>
  );
}

JiraToolProjectInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string
};

JiraToolProjectInput.defaultProps = {
  fieldName: "toolProjectId"
};

export default JiraToolProjectInput;