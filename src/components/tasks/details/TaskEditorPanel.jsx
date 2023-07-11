import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import taskActions from "components/tasks/task.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TaskConfigurationPanel
from "components/tasks/details/tasks/TaskConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
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
import GitToGitMergeSyncTaskHelpDocumentation
from "../../common/help/documentation/tasks/GitToGitMergeSyncTaskHelpDocumentation";
import SalesforceToGitMergeSyncTaskHelpDocumentation
from "../../common/help/documentation/tasks/SalesforceToGitMergeSyncTaskHelpDocumentation";
import modelHelpers from "components/common/model/modelHelpers";
import SfdxQuickDeployTaskHelpDocumentation
from "../../common/help/documentation/tasks/SfdxQuickDeployTaskHelpDocumentation";
import GitCustodianTaskHelpDocumentation from "../../common/help/documentation/tasks/GitCustodianTaskHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";

function TaskEditorPanel({ taskData, handleClose, backButtonFunction }) {
  const [taskModel, setTaskModel] = useState(undefined);
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    isSaasUser,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setTaskModel(undefined);

    if (taskData) {
      setTaskModel({...taskData});
    }
  }, [taskData]);

  const createGitTask = async () => {
    const configuration = taskConfigurationModel ? taskConfigurationModel.getPersistData() : {};
    taskModel.setData("configuration", configuration);
    const newTaskResponse = await taskActions.createTaskV2(getAccessToken, cancelTokenSource, taskModel);
    const taskId = newTaskResponse?.data?._id;
    const updatedTaskData = newTaskResponse?.data;
    const newTaskModel = modelHelpers.parseObjectIntoModel(updatedTaskData, taskModel.getMetaData());

    if(taskModel?.getData("type") === TASK_TYPES.SNAPLOGIC_TASK && configuration?.iValidatorScan && typeof configuration?.validationToken === "string") {
      const keyName = `${taskId}-${taskModel?.getData("type")}-validationToken`;
      const response = await taskActions.saveRecordToVault(
        getAccessToken,
        cancelTokenSource,
        keyName,
        configuration?.validationToken,
        taskId,
      );
      configuration.validationToken = response?.status === 200 ? { name: "Vault Secured Key", vaultKey: keyName } : {};
      taskModel.setData("configuration", configuration);

      return await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newTaskModel);
    }
    return newTaskResponse;
  };

  const updateGitTask = async () => {
    const newConfiguration = taskConfigurationModel ? taskConfigurationModel.getPersistData() : {};
    if(taskModel?.getData("type") === TASK_TYPES.SNAPLOGIC_TASK && newConfiguration?.iValidatorScan && typeof newConfiguration?.validationToken === "string") {
      const keyName = `${taskModel?.getData("_id")}-${taskModel?.getData("type")}-validationToken`;
      const response = await taskActions.saveRecordToVault(
        getAccessToken,
        cancelTokenSource,
        keyName,
        newConfiguration?.validationToken,
        taskModel?.getData("_id"),
      );
      newConfiguration.validationToken = response?.status === 200 ? { name: "Vault Secured Key", vaultKey: keyName } : {};
    }
    taskModel.setData("configuration", newConfiguration);
    return await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, taskModel);
  };

  const getHelpDocumentation = (setHelpIsShown) => {
    switch (taskModel?.getData("type")) {
    case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      return <AwsEcsClusterCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      return <AwsEcsServiceCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
      return <AwsLambdaFunctionCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.AZURE_CLUSTER_CREATION:
      return <AzureAksClusterCreationTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
      return <GitToGitMergeSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      return <SalesforceBulkMigrationHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SYNC_GIT_BRANCHES:
      return <GitToGitSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
      return <SfdcOrgSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
      return <SalesforceToGitMergeSyncTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
      return <SfdxQuickDeployTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.GITSCRAPER:
      return <GitCustodianTaskHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      break;
    case TASK_TYPES.SNAPLOGIC_TASK:
      break;
    case TASK_TYPES.SALESFORCE_CUSTOM_SETTING_MIGRATION:
      break;
    default:
      return <TaskCreationHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
    }
  };

  const getDynamicFields = () => {
    if (taskModel?.isNew() && isSaasUser === false) {
      return (
        <Col lg={12} className="mb-4">
          <RoleAccessInput
            model={taskModel}
            setModel={setTaskModel}
          />
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

  return (
    <div>
      <EditorPanelContainer
        handleClose={handleClose}
        recordDto={taskModel}
        createRecord={createGitTask}
        updateRecord={updateGitTask}
        setRecordDto={setTaskModel}
        getHelpComponent={getHelpDocumentation}
        isIncomplete={taskModel.checkCurrentValidity() !== true || taskConfigurationModel == null || taskConfigurationModel.checkCurrentValidity() !== true}
        lenient={true}
        disable={taskModel.checkCurrentValidity() !== true || taskModel?.getData("status") === "running"}
        backButtonFunction={backButtonFunction}
      >
        {getBody()}
      </EditorPanelContainer>
    </div>
  );
}

TaskEditorPanel.propTypes = {
  taskData: PropTypes.object,
  handleClose: PropTypes.func,
  backButtonFunction: PropTypes.func,
};

export default TaskEditorPanel;


