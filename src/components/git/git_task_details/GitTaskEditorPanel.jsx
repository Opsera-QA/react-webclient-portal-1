import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import gitTasksActions from "components/git/git-task-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import GitTasksConfigurationPanel
  from "components/git/git_task_details/configuration_forms/GitTasksConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import { Button } from "react-bootstrap";
import { DialogToastContext } from "contexts/DialogToastContext";
import GitTaskSfdcPipelineWizardOverlay from "components/git/git_task_details/configuration_forms/sfdc-org-sync/GitTaskSfdcPipelineWizardOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import GitTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/GitTaskTypeSelectInput";
import './style.css';
function GitTaskEditorPanel({ gitTasksData, setGitTasksData, runTask, handleClose }) {
  const { getAccessToken, isSassUser} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitTasksDataDto, setGitTasksDataDto] = useState(undefined);
  const [gitTasksConfigurationDataDto, setGitTasksConfigurationDataDto] = useState(undefined);
  const [helpIsShown, setHelpIsShown] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    if (isMounted?.current === true) {
      setGitTasksDataDto(gitTasksData);
    }
  };

  const createGitTask = async () => {
    const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
    gitTasksDataDto.setData("configuration", configuration);
    return await gitTasksActions.createGitTaskV2(getAccessToken, cancelTokenSource, gitTasksDataDto);
  };

  const updateGitTask = async () => {
    const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
    gitTasksDataDto.setData("configuration", configuration);
    return await gitTasksActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksDataDto);
  };

  const handleRunTask = () => {
    if (gitTasksData.getData("type") === "sync-sfdc-repo") {  
      // open wizard views
      toastContext.showOverlayPanel(<GitTaskSfdcPipelineWizardOverlay gitTasksData={gitTasksData}/>);
      return;
    }    
    if (gitTasksData.getData("type") === "sync-branch-structure") {  
      // open wizard views
      console.log("Git branch task run triggered");
      return;
    }
  };

  const getExtraButtons = () => {
    // TODO: Make run task button
    if (runTask === true) {
      return (
        <Button variant="primary" onClick={handleRunTask}>
          <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/> Run Task
        </Button>
      );
    }
  };

  const getRunTaskText = () => {
    if (runTask === true) {
      return (
        <div>Listed below are all settings related to this task. If you want to run the task, please confirm all
          settings
          and then click the Run button at the bottom of the form. This will trigger the job which will take a few
          minutes to
          complete. The status of this job will be updated in the Activity logs. Please consult those logs for all
          details on
          this action.
        </div>
      );
    }
  };

  const getHelpDocumentation = () => {
      switch (gitTasksDataDto.getData("type")) {
        case "sync-sfdc-repo":
        case "sync-branch-structure":
        case "sync-git-branches":
        case "sfdc-cert-gen":
        case "ecs_cluster_creation":
        case "ecs_service_creation":
        case "lambda_function_creation":
        default:
      }
  };

  const getDynamicFields = () => {
    if (gitTasksDataDto?.isNew() && !isSassUser()) {
      return (
        <Col lg={12} className="mb-4 task_editor">
          <RoleAccessInput dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} fieldName={"roles"}/>
        </Col>
      );
    }
    return null;
  };
  const handleGitTaskTypeChange = (fieldName, value) => {
    let newDataObject = gitTasksDataDto;
    newDataObject.setData("type", value.value);
    newDataObject.setData("configuration", {});
    setGitTasksConfigurationDataDto(undefined);
    setGitTasksDataDto({...newDataObject});
  };

  const getBody = () => {
    // if (helpIsShown) {
    //   return getHelpDocumentation();
    // }

    return (
      <>
        {/*<ActionBarContainer>*/}
        {/*  <div />*/}
        {/*  <div>*/}
        {/*    <ActionBarToggleHelpButton*/}
        {/*      toggleHelp={() => setHelpIsShown(true)}*/}
        {/*      helpIsShown={helpIsShown}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</ActionBarContainer>*/}
        {getRunTaskText()}
        <Row>
          <Col lg={6}>
            <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto} fieldName={"name"}/>
          </Col>
          <Col lg={6}>
          <GitTaskTypeSelectInput setDataFunction={handleGitTaskTypeChange} dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} />
          </Col>
          {/* <Col lg={6}>
          <ActivityToggleInput dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} fieldName={"active"}/>
        </Col> */}
          
          <Col lg={12}>
            <TagManager type={"task"} setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}/>
          </Col>
          <Col lg={12}>
            <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}
                           fieldName={"description"}/>
          </Col>
          {getDynamicFields()}
        </Row>
        <GitTasksConfigurationPanel
          gitTasksConfigurationData={gitTasksConfigurationDataDto}
          gitTasksDataDto={gitTasksDataDto}
          setGitTasksDataDto={setGitTasksDataDto}
          setGitTasksConfigurationData={setGitTasksConfigurationDataDto}
        />
        
      </>
    );
  };

  if (gitTasksDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={gitTasksDataDto}
      createRecord={createGitTask}
      updateRecord={updateGitTask}
      setRecordDto={setGitTasksDataDto}
      showBooleanToggle={true}
      // extraButtons={getExtraButtons()}
      lenient={true}
      disable={
        !gitTasksDataDto.checkCurrentValidity()
        || (gitTasksConfigurationDataDto == null || !gitTasksConfigurationDataDto.checkCurrentValidity()) ||
        gitTasksDataDto?.getData("status") === "running"
      }
    >
      {getBody()}
    </EditorPanelContainer>
  );
}

GitTaskEditorPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  handleClose: PropTypes.func,
  runTask: PropTypes.bool,
};

export default GitTaskEditorPanel;


