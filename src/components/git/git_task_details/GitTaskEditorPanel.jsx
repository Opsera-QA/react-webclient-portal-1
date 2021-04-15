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
import SFDCViewOverlay from "./configuration_forms/sfdc-org-sync/SFDCViewOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";

function GitTaskEditorPanel({ gitTasksData, setGitTasksData, runTask, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitTasksDataDto, setGitTasksDataDto] = useState(undefined);
  const [gitTasksConfigurationDataDto, setGitTasksConfigurationDataDto] = useState(undefined);
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
      toastContext.showOverlayPanel(<SFDCViewOverlay gitTasksData={gitTasksData}/>);
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
      extraButtons={getExtraButtons()}
      lenient={true}
      disable={
        !gitTasksDataDto.checkCurrentValidity()
        || (gitTasksConfigurationDataDto == null || !gitTasksConfigurationDataDto.checkCurrentValidity())
      }
    >
      {runTask === true &&
        <div>Listed below are all settings related to this task. If you want to run the task, please confirm all
          settings
          and then click the Run button at the bottom of the form. This will trigger the job which will take a few
          minutes to
          complete. The status of this job will be updated in the Activity logs. Please consult those logs for all
          details on
          this action.
        </div>}
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}
                         fieldName={"description"}/>
        </Col>
        <Col lg={12}>
          <TagManager type={"task"} setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}/>
        </Col>
      </Row>
      <GitTasksConfigurationPanel
        gitTasksConfigurationData={gitTasksConfigurationDataDto}
        gitTasksDataDto={gitTasksDataDto}
        setGitTasksDataDto={setGitTasksDataDto}
        setGitTasksConfigurationData={setGitTasksConfigurationDataDto}
      />
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


