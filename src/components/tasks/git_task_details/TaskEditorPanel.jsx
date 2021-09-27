import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import taskActions from "components/tasks/task.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TaskConfigurationPanel
  from "components/tasks/git_task_details/configuration_forms/TaskConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";
import AwsEcsClusterCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsEcsClusterCreationTaskHelpDocumentation";
import TaskCreationHelpDocumentation from "components/common/help/documentation/tasks/TaskCreationHelpDocumentation";
import AwsEcsServiceCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsEcsServiceCreationTaskHelpDocumentation";
import SfdcOrgSyncTaskHelpDocumentation
  from "components/common/help/documentation/tasks/SfdcOrgSyncTaskHelpDocumentation";
import {TASK_TYPES} from "components/tasks/task.types";
import AzureAksClusterCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AzureAksClusterCreationTaskHelpDocumentation";
import TasksTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/TasksTaskTypeSelectInput";
import AwsLambdaFunctionCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsLambdaFunctionCreationTaskHelpDocumentation";

function TaskEditorPanel({ taskData, handleClose }) {
  const { getAccessToken, featureFlagHideItemInProd } = useContext(AuthContext);
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
      setGitTasksDataDto(taskData);
    }
  };

  const createGitTask = async () => {
    const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
    gitTasksDataDto.setData("configuration", configuration);
    return await taskActions.createGitTaskV2(getAccessToken, cancelTokenSource, gitTasksDataDto);
  };

  const updateGitTask = async () => {
    const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
    gitTasksDataDto.setData("configuration", configuration);
    return await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksDataDto);
  };

  const getHelpDocumentation = (setHelpIsShown) => {
    switch (gitTasksDataDto?.getData("type")) {
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return <AwsEcsClusterCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        return <AwsEcsServiceCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return <SfdcOrgSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
        return <AwsLambdaFunctionCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return <AzureAksClusterCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      case TASK_TYPES.SYNC_GIT_BRANCHES:
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        break;
      default:
        return <TaskCreationHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    }
  };

  const getBody = () => {
    return (
      <>
        <Row>
          <Col lg={6}>
            <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto} fieldName={"name"}/>
          </Col>
          <Col lg={6}>
            <TasksTaskTypeSelectInput
              model={gitTasksDataDto}
              setModel={setGitTasksDataDto}
              setTaskConfigurationModel={setGitTasksConfigurationDataDto}
            />
          </Col>
          {/* <Col lg={6}>
          <ActivityToggleInput dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} fieldName={"active"}/>
        </Col> */}
          <Col lg={12}>
            <TextInputBase setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}
                           fieldName={"description"}/>
          </Col>
          <Col lg={12}>
            <TagManager type={"task"} setDataObject={setGitTasksDataDto} dataObject={gitTasksDataDto}/>
          </Col>
        </Row>
        <TaskConfigurationPanel
          gitTasksConfigurationData={gitTasksConfigurationDataDto}
          gitTasksDataDto={gitTasksDataDto}
          setGitTasksDataDto={setGitTasksDataDto}
          setGitTasksConfigurationData={setGitTasksConfigurationDataDto}
          taskType={gitTasksDataDto?.getData("type")}
        />
      </>
    );
  };

  if (gitTasksDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  // TODO: Refactor to VanityEditorPanelContainer in a future enhancement
  return (
    <div>
      <EditorPanelContainer
        handleClose={handleClose}
        recordDto={gitTasksDataDto}
        createRecord={createGitTask}
        updateRecord={updateGitTask}
        setRecordDto={setGitTasksDataDto}
        getHelpComponent={getHelpDocumentation}
        lenient={true}
        disable={
          !gitTasksDataDto.checkCurrentValidity()
          || (gitTasksConfigurationDataDto == null || !gitTasksConfigurationDataDto.checkCurrentValidity()) ||
          gitTasksDataDto?.getData("status") === "running"
        }
      >
        {getBody()}
      </EditorPanelContainer>
    </div>
  );
}

TaskEditorPanel.propTypes = {
  taskData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default TaskEditorPanel;


