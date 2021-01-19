import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import inventoryActions from "components/inventory/inventory-actions";
import Model from "core/data_model/model";
import jiraProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jira-project-metadata";
import toolMetadata from "components/inventory/tools/tool-metadata";
import JiraToolProjectSummaryCard
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectSummaryCard";
import modelHelpers from "components/common/model/modelHelpers";
import jiraConfigurationMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/jiraConfigurationMetadata";
import Col from "react-bootstrap/Col";
import JiraUserFields from "components/common/fields/inventory/tools/jira/JiraUserFields";

function JiraToolProjectField({ dataObject, jiraToolId, jiraToolProjectId, fieldName, children, title, showUsersFields }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [toolProjectData, setToolProjectData] = useState(undefined);
  const [jiraToolProjectConfiguration, setJiraToolProjectConfiguration] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId, jiraToolProjectId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadJiraTool();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadJiraTool = async () => {
    if (jiraToolId !== "" && jiraToolProjectId !== "") {
      const response = await inventoryActions.getToolById(jiraToolId, getAccessToken);
      const toolDataResponse = response?.data[0];

      if (toolDataResponse != null) {
        const toolDataDto = new Model(toolDataResponse, toolMetadata, false);
        unpackJiraToolProject(toolDataDto)
      }
    }
  };

  const unpackJiraToolProject = (toolDataDto) => {
    let toolProjects = toolDataDto.getData("projects");
    const jiraToolProjectId = dataObject.getData(fieldName);

    if (toolProjects?.length > 0 && jiraToolProjectId !== "") {
      let projectData = toolProjects.find((project) => project.id === jiraToolProjectId);

      if (projectData != null) {
        let toolProjectDto = new Model({...projectData}, jiraProjectMetadata, false);
        let jiraToolProjectDto = modelHelpers.getToolConfigurationModel(toolProjectDto.getData("configuration"), jiraConfigurationMetadata);
        setToolProjectData(toolProjectDto);
        setJiraToolProjectConfiguration(jiraToolProjectDto);
      }
    }
  };

  const getUsersFields = () => {
    if (showUsersFields && jiraToolId && jiraToolProjectConfiguration) {
      return (
        <Col lg={12}>
          <JiraUserFields
            dataObject={dataObject}
            jiraToolId={jiraToolId}
            primaryUserField={"jiraPrimaryAssignee"}
            secondaryUsersField={"jiraSecondaryAssignees"}
            jiraProjectKey={jiraToolProjectConfiguration.getData("jiraProject")}
          />
        </Col>
      );
    }
  };

  return (
    <FieldContainer>
      <JiraToolProjectSummaryCard jiraProjectData={toolProjectData} jiraConfigurationData={jiraToolProjectConfiguration} title={title}>
        {children}
        {getUsersFields()}
      </JiraToolProjectSummaryCard>
    </FieldContainer>
  );
}

JiraToolProjectField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string,
  title: PropTypes.string,
  jiraToolProjectId: PropTypes.string,
  showUsersFields: PropTypes.bool,
  children: PropTypes.any
};

export default JiraToolProjectField;