import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {generateUUID} from "components/common/helpers/string-helpers";
import JiraProjectConfigurationPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraProjectConfigurationPanel";
import axios from "axios";

function JiraToolProjectEditorPanel({ toolData, jiraProjectData, setJiraProjectData, handleClose }) {
  const [jiraConfigurationDto, setJiraConfigurationDto] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createJiraProject = async () => {
    let newToolData = {...toolData};
    const jiraProjectAlreadyExists = newToolData.getData("projects").some(project => project.name === jiraProjectData.getData("name"));

    if (jiraProjectAlreadyExists) {
      throw new Error("Name Must Be Unique");
    }

    let jiraProjects = newToolData.getData("projects");
    let newProject = jiraProjectData.getPersistData();
    const newConfigurationData = jiraConfigurationDto.getPersistData();
    newProject["id"] = generateUUID();
    newProject["configuration"] = newConfigurationData;
    jiraProjects.push(newProject);
    newToolData.setData("projects", jiraProjects);
    return await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, newToolData);
  };

  const updateJiraProject = async () => {
    let newToolData = {...toolData};

    if (jiraProjectData.isChanged("name")) {
      const originalName = jiraProjectData.getOriginalValue("name");

      // If name is changed, make sure it doesn't conflict with an existing project
      const jiraProjectAlreadyExists = newToolData.getData("projects").some(project => project.name === originalName);
      if (jiraProjectAlreadyExists) {
        throw new Error("Name Must Be Unique");
      }
    }

    let jiraProjects = newToolData.getData("projects");
    const currentIndex = jiraProjects.findIndex(project => project.id === jiraProjectData.getData("id"));
    const newConfigurationData = jiraConfigurationDto.getPersistData();
    jiraProjectData.setData("configuration", newConfigurationData);

    if (currentIndex != null) {
      jiraProjects[currentIndex] = jiraProjectData.getPersistData();
    }
    else {
      throw new Error("Could not find project to update");
    }

    newToolData.setData("projects", jiraProjects);
    return await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, newToolData);
  };

  return (
    <EditorPanelContainer
      recordDto={jiraProjectData}
      setRecordDto={setJiraProjectData}
      handleClose={handleClose}
      updateRecord={updateJiraProject}
      createRecord={createJiraProject}
      lenient={true}
      disable={jiraProjectData == null || !jiraProjectData.checkCurrentValidity() || jiraConfigurationDto == null || !jiraConfigurationDto.checkCurrentValidity()}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase dataObject={jiraProjectData} setDataObject={setJiraProjectData} fieldName={"name"} />
        </Col>
        <Col lg={12}>
          <TextInputBase dataObject={jiraProjectData} setDataObject={setJiraProjectData} fieldName={"description"} />
        </Col>
      </Row>
      <JiraProjectConfigurationPanel toolData={toolData} jiraProjectData={jiraProjectData} jiraConfigurationDto={jiraConfigurationDto} setJiraConfigurationDto={setJiraConfigurationDto} />
    </EditorPanelContainer>
  );
}

JiraToolProjectEditorPanel.propTypes = {
  toolData: PropTypes.object,
  jiraProjectData: PropTypes.object,
  setJiraProjectData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default JiraToolProjectEditorPanel;
