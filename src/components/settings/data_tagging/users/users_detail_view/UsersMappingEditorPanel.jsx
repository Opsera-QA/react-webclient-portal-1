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
import usersTagsMetadata from "../tagging-users-metadata";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import pipelineStepNotificationActions from "../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import jiraStepApprovalMetadata from "../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/jiraStepApprovalMetadata";
import dataMappingActions from "../../data-mapping-actions";
import SaveButton2 from "../../../../common/buttons/saving/SaveButton2";
import DeleteModal from "../../../../common/modal/DeleteModal";
import ScreenContainer from "../../../../common/panels/general/ScreenContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";
import { useHistory } from "react-router-dom";
import accountsActions from "../../../../admin/accounts/accounts-actions";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";

const TOOL_TYPES = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  // { value: "bitbucket", label: "Bitbucket" },
  { value: "jira", label: "Jira" },
  // { value: "sonar", label: "Sonar" }, DISABLING SONAR FOR NOW
];

function UsersMappingEditor({ toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [usersMappingDto, setUsersMappingDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolSearching, setToolSearching] = useState(false);
  const [toolsList, setToolsList] = useState([]);
  const [scmUserList, setSCMUserList] = useState([]);
  const [isSCMUserSearching, setIsSCMUserSearching] = useState(false);
  const [jiraProjectList, setJiraProjectList] = useState([]);
  const [isJiraProjectSearching, setIsJiraProjectSearching] = useState(false);
  const [opseraUsersList, setOpseraUsersList] = useState([]);
  const [isOpseraUsersSearching, setIsOpseraUsersSearching] = useState(false);
  const [jiraUsersList, setJiraUsersList] = useState([]);
  const [isJiraUsersSearching, setIsJiraUsersSearching] = useState(false);
  const [userss, setUserss] = useState([]);
  const [ldapInfo, setLdapInfo] = useState(undefined);

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
    let user = await getUserRecord();
    if (user) {
      if (user.ldap) {
        setLdapInfo(user.ldap);
      }
    }
    if (typeof toolTypeData !== "undefined") {
      setUsersMappingDto(new Model(toolTypeData.getPersistData(), usersTagsMetadata, false));
      onLoadFetch();
    } else {
      setUsersMappingDto(new Model({ ...usersTagsMetadata.newModelBase }, usersTagsMetadata, false));
    }
    setIsLoading(false);
  };

  const onLoadFetch = async () => {
    setToolSearching(true);
    await fetchToolList(toolTypeData.getData("tool_identifier").toString());
    if (toolTypeData.getData("tool_identifier") === "jira") {
      await loadJiraProject(toolTypeData.getData("tool_id"));
      await loadJiraUsers(toolTypeData.getData("tool_id"), toolTypeData.getData("tool_user_prop"));
    }
    if (toolTypeData.getData("tool_identifier") === "github" || toolTypeData.getData("tool_identifier") === "gitlab") {
      await loadSCMUsers(getAccessToken);
    }
    let user = await getUserRecord();
    if (user) {
      if (user.ldap) {
        setLdapInfo(user.ldap);
      }
    }
    await loadOpseraUsers(user.ldap, getAccessToken);
    setToolSearching(false);
  };

  const createMapping = async () => {
    let response = await dataMappingActions.createUserMapping(usersMappingDto, getAccessToken);
    if (response.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async () => {
    return await dataMappingActions.updateUserMapping(usersMappingDto, getAccessToken);
  };

  const handleActiveToggle = async () => {
    try {
      let newToolTypeData = { ...usersMappingDto };
      newToolTypeData.setData("active", !newToolTypeData.getData("active"));
      let response = await dataMappingActions.updateUserMapping({ ...newToolTypeData }, getAccessToken);
      let updatedDto = new Model(response.data, usersMappingDto.metaData, false);
      setUsersMappingDto(updatedDto);
      toastContext.showUpdateSuccessResultDialog("User Mapping");
    } catch (error) {
      toastContext.showUpdateFailureResultDialog("User Mapping", error);
    }
  };

  const loadJiraProject = async (jiraToolId) => {
    setIsJiraProjectSearching(true);
    let dataObject = new Model({ jiraToolId: jiraToolId }, jiraStepApprovalMetadata, false);
    try {
      const response = await pipelineStepNotificationActions.getJiraProjects(dataObject, getAccessToken);
      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        if (response.data.status !== 200) {
          toastContext.showLoadingErrorDialog("Error in fetching Jira Projects\"");
          return
        }
        setJiraProjectList(response.data.message);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog("Error in fetching Jira Projects");
    } finally {
      setIsJiraProjectSearching(false);
    }
  };

  const loadJiraUsers = async (jiraToolId, jiraProject) => {
    setIsJiraUsersSearching(true);
    try {
      let dataObject = new Model({ jiraToolId: jiraToolId, jiraProject: jiraProject }, jiraStepApprovalMetadata, false);
      const response = await pipelineStepNotificationActions.getJiraProjectUsers(dataObject, getAccessToken);
      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        if (response.data.status !== 200) {
          toastContext.showLoadingErrorDialog("Error in fetching Jira Users");
          return
        }
        setJiraUsersList(response.data.message);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog("Error in fetching Jira Users");
    } finally {
      setIsJiraUsersSearching(false);
    }
  };

  const loadOpseraUsers = async (org, getAccessToken) => {
    setIsOpseraUsersSearching(true);
    try {
      const response = await accountsActions.getOrganizationAccountMembers(org.account, getAccessToken);
      if (response.data != null && Array.isArray(response.data)) {
        setOpseraUsersList(response.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsOpseraUsersSearching(false);
    }
  };

  const loadSCMUsers = async (getAccessToken) => {
    setIsSCMUserSearching(true);
    try {
      const response = await dataMappingActions.getSCMUserList(usersMappingDto ? usersMappingDto : toolTypeData, getAccessToken);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setSCMUserList(response.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsSCMUserSearching(false);
    }
  };

  if (isLoading || !usersMappingDto) {
    return <LoadingDialog size="sm" />;
  }

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "tool_identifier") {
      let newDataObject = usersMappingDto;
      newDataObject.setData("tool_identifier", value.value);
      await fetchToolList(value.value.toString());
      setUsersMappingDto({ ...newDataObject });
    }
    if (fieldName === "tool_id") {
      let newDataObject = usersMappingDto;
      newDataObject.setData("tool_id", value.id);
      setUsersMappingDto({ ...newDataObject });
      if (usersMappingDto.getData("tool_identifier") === "jira") {
        await loadJiraProject(value.id);
      }
      if (
        usersMappingDto.getData("tool_identifier") === "gitlab" ||
        usersMappingDto.getData("tool_identifier") === "github"
      ) {
        await loadSCMUsers(getAccessToken);
      }
      return
    }
    if (fieldName === "tool_user_prop") {
      let newDataObject = usersMappingDto;
      newDataObject.setData("tool_user_prop", value.key);
      setUsersMappingDto({ ...newDataObject });
      if (usersMappingDto.getData("tool_identifier") === "jira") {
        await loadJiraUsers(usersMappingDto.getData("tool_id"), value.key);
      }
    }
    if (fieldName === "tool_user_id") {
      let newDataObject = usersMappingDto;
      if (usersMappingDto.getData("tool_identifier") === "jira") {
        newDataObject.setData("tool_user_id", value.accountId);
        newDataObject.setData("tool_user_email", value.emailAddress);
      }
      if (
        usersMappingDto.getData("tool_identifier") === "gitlab" ||
        usersMappingDto.getData("tool_identifier") === "github"
      ) {
        newDataObject.setData("tool_user_id", value.id);
        newDataObject.setData("tool_user_email", value.userName);
      }
      setUsersMappingDto({ ...newDataObject });
      await loadOpseraUsers(ldapInfo, getAccessToken);
      return;
    }
    if (fieldName === "opsera_user_email") {
      let newDataObject = usersMappingDto;
      newDataObject.setData("opsera_user_id", value._id);
      newDataObject.setData("opsera_user_email", value.email);
      setUsersMappingDto({ ...newDataObject });
      return;
    }
  };

  if (usersMappingDto === null) {
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
            setDataObject={setUsersMappingDto}
            valueField="value"
            textField="label"
            dataObject={usersMappingDto}
            filter={"contains"}
            selectOptions={TOOL_TYPES ? TOOL_TYPES : []}
            fieldName={"tool_identifier"}
          />
        </Col>
        <Col lg={12}>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setUsersMappingDto}
            textField={"name"}
            valueField={"id"}
            dataObject={usersMappingDto}
            filter={"contains"}
            selectOptions={toolsList ? toolsList : []}
            fieldName={"tool_id"}
            busy={toolSearching}
            disabled={usersMappingDto && usersMappingDto.getData("tool_identifier").length === 0}
          />
        </Col>
        {usersMappingDto && usersMappingDto.getData("tool_identifier") === "jira" && (
          <>
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChange}
                selectOptions={jiraProjectList}
                fieldName={"tool_user_prop"}
                setDataObject={setUsersMappingDto}
                dataObject={usersMappingDto}
                valueField={"key"}
                textField={"name"}
                busy={isJiraProjectSearching}
                disabled={isJiraProjectSearching || jiraProjectList && jiraProjectList.length === 0}
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChange}
                selectOptions={jiraUsersList}
                fieldName={"tool_user_id"}
                setDataObject={setUsersMappingDto}
                dataObject={usersMappingDto}
                valueField={"accountId"}
                textField={"displayName"}
                busy={isJiraUsersSearching}
                disabled={isJiraUsersSearching || jiraUsersList && jiraUsersList.length === 0}
              />
            </Col>
          </>
        )}
        {usersMappingDto &&
          (usersMappingDto.getData("tool_identifier") === "gitlab" ||
            usersMappingDto.getData("tool_identifier") === "github") && (
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChange}
                selectOptions={scmUserList}
                fieldName={"tool_user_id"}
                setDataObject={setUsersMappingDto}
                dataObject={usersMappingDto}
                valueField={"id"}
                textField={"name"}
                busy={isSCMUserSearching}
                disabled={isSCMUserSearching || scmUserList && scmUserList.length === 0}
              />
            </Col>
          )}

        <Col lg={12}>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            selectOptions={opseraUsersList}
            fieldName={"opsera_user_email"}
            setDataObject={setUsersMappingDto}
            dataObject={usersMappingDto}
            valueField={"_id"}
            textField={"email"}
            busy={isOpseraUsersSearching}
            disabled={isOpseraUsersSearching || opseraUsersList && opseraUsersList.length === 0}
          />
        </Col>
      </Row>
      <Row>
        {toolTypeData && (
          <div className="mr-auto mt-4 ml-2 px-3">
            <ActionBarToggleButton
              status={usersMappingDto?.getData("active")}
              handleActiveToggle={handleActiveToggle}
            />
          </div>
        )}
        <div className="ml-auto mt-3 px-3">
          <SaveButton2
            className="ml-auto mt-3 px-3"
            recordDto={usersMappingDto}
            setRecordDto={setUsersMappingDto}
            createRecord={createMapping}
            updateRecord={toolTypeData ? updateMapping : createMapping}
            handleClose={handleClose}
          />
        </div>
      </Row>
    </EditorPanelContainer>
  );
}

UsersMappingEditor.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default UsersMappingEditor;
