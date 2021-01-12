import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import LoadingDialog from "../../../../common/status_notifications/loading";
import DtoTagManagerInput from "../../../../common/input/dto_input/dto-tag-manager-input";
import EditorPanelContainer from "../../../../common/panels/detail_panel_container/EditorPanelContainer";
import DtoSelectInput from "../../../../common/input/dto_input/dto-select-input";
import pipelineActions from "../../../../workflow/pipeline-actions";
import Model from "../../../../../core/data_model/model";
import projectTagsMetadata from "../tagging-project-metadata";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import pipelineStepNotificationActions from "../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import jiraStepApprovalMetadata from "../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/jiraStepApprovalMetadata";
import dataMappingActions from "../../data-mapping-actions";
import DeleteModal from "../../../../common/modal/DeleteModal";
import ScreenContainer from "../../../../common/panels/general/ScreenContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

const TOOL_TYPES = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "jira", label: "Jira" },
  // { value: "sonar", label: "Sonar" }, DISABLING SONAR FOR NOW
];

function ProjectMappingEditor({ toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [projectMappingDto, setProjectMappingDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolSearching, setToolSearching] = useState(false);
  const [toolsList, setToolsList] = useState([]);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchToolList = async (tool) => {
    setToolSearching(true);

    let results = await pipelineActions.getToolsList(tool, getAccessToken);

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setToolsList(filteredList);
    }
    setToolSearching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    if (typeof toolTypeData !== "undefined") {
      setProjectMappingDto(new Model(toolTypeData.getPersistData(), projectTagsMetadata, false));
      onLoadFetch();
    } else {
      setProjectMappingDto(new Model({ ...projectTagsMetadata.newModelBase }, projectTagsMetadata, false));
    }
    setIsLoading(false);
  };

  const onLoadFetch = async () => {
    setToolSearching(true);
    await fetchToolList(toolTypeData.getData("tool_identifier").toString());
    setToolSearching(false);
    setIsRepoSearching(true);
    if (toolTypeData.getData("tool_identifier").length > 0 && toolTypeData.getData("tool_identifier") === "bitbucket") {
      setIsWorkspacesSearching(true);
      await getWorkspaces("bitbucket", toolTypeData.getData("tool_id"), getAccessToken);
      setIsWorkspacesSearching(false);
      setIsRepoSearching(true);
      await searchRepositories("bitbucket", toolTypeData.getData("tool_id"), toolTypeData.getData("tool_prop"));
      setIsRepoSearching(false);
      return;
    }
    if (
      (toolTypeData.getData("tool_identifier").length > 0 && toolTypeData.getData("tool_identifier") === "gitlab") ||
      toolTypeData.getData("tool_identifier") === "github"
    ) {
      await searchRepositories(toolTypeData.getData("tool_identifier"), toolTypeData.getData("tool_id"), "");
      return;
    }
    if (toolTypeData.getData("tool_identifier").length > 0 && toolTypeData.getData("tool_identifier") === "jira") {
      await loadProjects(toolTypeData.getData("tool_id"));
      return;
    }
    setIsRepoSearching(false);
  };

  const createMapping = async () => {
    let response = await dataMappingActions.createProjectMapping(projectMappingDto, getAccessToken);
    if (response.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async () => {
    return await dataMappingActions.updateProject(projectMappingDto, getAccessToken);
  };

  const handleActiveToggle = async () => {
    try {
      let newToolTypeData = { ...projectMappingDto };
      newToolTypeData.setData("active", !newToolTypeData.getData("active"));
      let response = await dataMappingActions.updateProject({ ...newToolTypeData }, getAccessToken);
      let updatedDto = new Model(response.data, projectMappingDto.metaData, false);
      setProjectMappingDto(updatedDto);
      toastContext.showUpdateSuccessResultDialog("Project Mapping");
    } catch (error) {
      toastContext.showUpdateFailureResultDialog("Project Mapping", error);
    }
  };

  const searchRepositories = async (service, gitAccountId, workspace) => {
    setIsRepoSearching(true);
    try {
      let results = await pipelineActions.searchRepositories(service, gitAccountId, workspace, getAccessToken);
      if (typeof results != "object") {
        toastContext.showLoadingErrorDialog(`There has been an error in fetching ${service} repositories`);
        return
      }
      setRepoList(results);
    } catch (error) {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${service} repositories`);
    } finally {
      setIsRepoSearching(false);
    }
  };

  const getWorkspaces = async (service, tool, getAccessToken) => {
    setIsWorkspacesSearching(true);
    try {
      let results = await pipelineActions.searchWorkSpaces(service, tool, getAccessToken);
      if (typeof results != "object") {
        toastContext.showLoadingErrorDialog(`There has been an error in fetching ${service} workspaces`);
        return
      }
      setWorkspacesList(results);
    } catch (error) {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${service} workspaces`);
    } finally {
      setIsWorkspacesSearching(false);
    }
  };

  const loadProjects = async (jiraToolId) => {
    try {
      setIsRepoSearching(true);
      let dataObject = new Model({ jiraToolId: jiraToolId }, jiraStepApprovalMetadata, false);
      const response = await pipelineStepNotificationActions.getJiraProjects(dataObject, getAccessToken);
      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        setRepoList(response.data.message);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching Jira Projects`);
    } finally {
      setIsRepoSearching(false);
    }
  };

  if (isLoading || !projectMappingDto) {
    return <LoadingDialog size="sm" />;
  }

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "tool_identifier") {
      let newDataObject = projectMappingDto;
      newDataObject.setData("tool_identifier", value.value);
      await fetchToolList(value.value.toString());
      setProjectMappingDto({ ...newDataObject });
    }
    if (fieldName === "tool_id") {
      let newDataObject = projectMappingDto;
      newDataObject.setData("tool_id", value.id);
      setProjectMappingDto({ ...newDataObject });
      if (
        projectMappingDto.getData("tool_identifier").length > 0 &&
        projectMappingDto.getData("tool_identifier") === "bitbucket"
      ) {
        await getWorkspaces("bitbucket", value.id, getAccessToken);
        return;
      }
      if (
        (projectMappingDto.getData("tool_identifier").length > 0 &&
          projectMappingDto.getData("tool_identifier") === "gitlab") ||
        projectMappingDto.getData("tool_identifier") === "github"
      ) {
        await searchRepositories(projectMappingDto.getData("tool_identifier"), value.id, "");
        return;
      }
      if (
        projectMappingDto.getData("tool_identifier").length > 0 &&
        projectMappingDto.getData("tool_identifier") === "jira"
      ) {
        await loadProjects(value.id);
        return;
      }
    }
    if (fieldName === "tool_prop") {
      let newDataObject = projectMappingDto;
      newDataObject.setData("tool_prop", value);
      setProjectMappingDto({ ...newDataObject });
      await searchRepositories(
        projectMappingDto.getData("tool_identifier"),
        projectMappingDto.getData("tool_id"),
        value
      );
      return
    }
  };

  if (projectMappingDto === null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer>
      {toolTypeData && (
        <Card>
          <Card.Text className={"mt-3 mb-3"} style={{ display: "flex", justifyContent: "center" }}>
            <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
            functionality from data previously mapped with this information
          </Card.Text>
        </Card>
      )}
      <Row>
        <Col lg={12}>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setProjectMappingDto}
            valueField="value"
            textField="label"
            dataObject={projectMappingDto}
            filter={"contains"}
            selectOptions={TOOL_TYPES ? TOOL_TYPES : []}
            fieldName={"tool_identifier"}
          />
        </Col>
        <Col lg={12}>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setProjectMappingDto}
            textField={"name"}
            valueField={"id"}
            dataObject={projectMappingDto}
            filter={"contains"}
            selectOptions={toolsList ? toolsList : []}
            fieldName={"tool_id"}
            busy={toolSearching}
            disabled={projectMappingDto && projectMappingDto.getData("tool_identifier").length === 0}
          />
        </Col>
        {projectMappingDto.getData("tool_identifier") === "bitbucket" && (
          <Col lg={12}>
            <DtoSelectInput
              setDataFunction={handleDTOChange}
              setDataObject={setProjectMappingDto}
              textField={"name"}
              valueField={"value"}
              dataObject={projectMappingDto}
              filter={"contains"}
              selectOptions={workspacesList ? workspacesList : []}
              fieldName={"tool_prop"}
              busy={isWorkspacesSearching}
              disabled={projectMappingDto.getData("tool_id").length === 0 || isWorkspacesSearching}
            />
          </Col>
        )}
        <Col lg={12}>
          <DtoTagManagerInput
            type={"project"}
            dataObject={projectMappingDto}
            fieldName={"value"}
            setDataObject={setProjectMappingDto}
            disabled={projectMappingDto && projectMappingDto.getData("tool_id").length === 0}
          />
        </Col>
        <Col lg={12}>
          <DtoSelectInput
            selectOptions={repoList}
            fieldName={"key"}
            setDataObject={setProjectMappingDto}
            dataObject={projectMappingDto}
            valueField={"name"}
            textField={"name"}
            busy={isRepoSearching}
            disabled={projectMappingDto.getData("value").length === 0 || isRepoSearching || repoList.length === 0}
          />
        </Col>
      </Row>
      <Row>
        {toolTypeData && (
          <div className="mr-auto mt-4 ml-2 px-3">
            <ActionBarToggleButton
              status={projectMappingDto?.getData("active")}
              handleActiveToggle={handleActiveToggle}
            />
            <br />
          </div>
        )}
        <div className="ml-auto mt-3 px-3">
          <SaveButtonBase
            recordDto={projectMappingDto}
            setRecordDto={setProjectMappingDto}
            createRecord={createMapping}
            updateRecord={toolTypeData ? updateMapping : createMapping}
            handleClose={handleClose}
          />
        </div>
      </Row>
    </EditorPanelContainer>
  );
}

ProjectMappingEditor.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ProjectMappingEditor;
