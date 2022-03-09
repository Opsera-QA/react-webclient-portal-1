import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import taskActions from "components/tasks/task.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TaskConfigurationPanel
  from "components/tasks/details/tasks/TaskConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import AwsEcsClusterCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsEcsClusterCreationTaskHelpDocumentation";
import TaskCreationHelpDocumentation from "components/common/help/documentation/tasks/TaskCreationHelpDocumentation";
import AwsEcsServiceCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsEcsServiceCreationTaskHelpDocumentation";
import {TASK_TYPES} from "components/tasks/task.types";
import AzureAksClusterCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AzureAksClusterCreationTaskHelpDocumentation";
import TasksTaskTypeSelectInput from "components/tasks/details/TasksTaskTypeSelectInput";
import AwsLambdaFunctionCreationTaskHelpDocumentation
  from "components/common/help/documentation/tasks/AwsLambdaFunctionCreationTaskHelpDocumentation";
import SfdcOrgSyncTaskHelpDocumentation
  from "components/common/help/documentation/tasks/SfdcOrgSyncTaskHelpDocumentation";
import GitToGitSyncTaskHelpDocumentation from "../../common/help/documentation/tasks/GitToGitSyncTaskHelpDocumentation";
import SalesforceBulkMigrationHelpDocumentation
  from "../../common/help/documentation/tasks/SalesforceBulkMigrationHelpDocumentation";

function TaskEditorPanel({ taskData, handleClose }) {
  const { getAccessToken, isSassUser, featureFlagHideItemInProd } = useContext(AuthContext);
  const [taskModel, setTaskModel] = useState(undefined);
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(undefined);
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
      setTaskModel(taskData);
    }
  };

  const createGitTask = async () => {
    const configuration = taskConfigurationModel ? taskConfigurationModel.getPersistData() : {};
    taskModel.setData("configuration", configuration);
    return await taskActions.createTaskV2(getAccessToken, cancelTokenSource, taskModel);
  };

  const updateGitTask = async () => {
    const configuration = taskConfigurationModel ? taskConfigurationModel.getPersistData() : {};
    taskModel.setData("configuration", configuration);
    return await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, taskModel);
  };

  const getHelpDocumentation = (setHelpIsShown) => {
    switch (taskModel?.getData("type")) {
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
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return <GitToGitSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case  TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        return <SalesforceBulkMigrationHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        break;
      default:
        return <TaskCreationHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    }
  };

  const getDynamicFields = () => {
    if (taskModel?.isNew() && !isSassUser()) {
      return (
        <Col lg={12} className="mb-4">
          <RoleAccessInput dataObject={taskModel} setDataObject={setTaskModel} fieldName={"roles"}/>
        </Col>
      );
    }
  };

  const getBody = () => {
    return (
      <>
        <Row>
          <Col lg={6}>
            <TextInputBase setDataObject={setTaskModel} dataObject={taskModel} fieldName={"name"}/>
          </Col>
          <Col lg={6}>
            <TasksTaskTypeSelectInput
              model={taskModel}
              setModel={setTaskModel}
              setTaskConfigurationModel={setTaskConfigurationModel}
            />
          </Col>
          {/* <Col lg={6}>
          <ActivityToggleInput dataObject={taskModel} setDataObject={setGitTasksDataDto} fieldName={"active"}/>
        </Col> */}

          <Col lg={12}>
            <TextInputBase setDataObject={setTaskModel} dataObject={taskModel}
                           fieldName={"description"}/>
          </Col>
          <Col lg={12}>
            <TagManager type={"task"} setDataObject={setTaskModel} dataObject={taskModel}/>
          </Col>
          {getDynamicFields()}
        </Row>
        <TaskConfigurationPanel
          taskConfigurationModel={taskConfigurationModel}
          taskModel={taskModel}
          setTaskModel={setTaskModel}
          setTaskConfigurationModel={setTaskConfigurationModel}
          taskType={taskModel?.getData("type")}
        />
      </>
    );
  };

  if (taskModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  // TODO: Refactor to VanityEditorPanelContainer in a future enhancement
  return (
    <div>
      <EditorPanelContainer
        handleClose={handleClose}
        recordDto={taskModel}
        createRecord={createGitTask}
        updateRecord={updateGitTask}
        setRecordDto={setTaskModel}
        getHelpComponent={getHelpDocumentation}
        lenient={true}
        disable={
          !taskModel.checkCurrentValidity()
          || (taskConfigurationModel == null || !taskConfigurationModel.checkCurrentValidity()) ||
          taskModel?.getData("status") === "running"
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


