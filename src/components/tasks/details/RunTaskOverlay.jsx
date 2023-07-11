import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import CloseButton from "components/common/buttons/CloseButton";
import TriggerTaskRunButton from "components/tasks/buttons/run_task/TriggerTaskRunButton";
import ec2ClusterCreationTaskConfigurationMetadata from "components/tasks/details/tasks/ecs-cluster-creation/ecs-creation-git-task-configuration";
import ec2ServiceCreationTaskConfigurationMetadata from "components/tasks/details/tasks/ecs-service-creation/ecs-service-creation-git-task-configuration";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {TASK_TYPES} from "components/tasks/task.types";
import azureAksClusterTaskConfigurationMetadata from "components/tasks/details/tasks/azure-cluster-creation/azure-cluster-metadata";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import salesforceQuickDeployTaskConfigurationMetadata from "components/tasks/details/tasks/sfdc-quick-deploy/salesforceQuickDeployTaskConfigurationMetadata";
import SalesforceQuickDeployTaskSalesforceToolSelectInput from "./tasks/sfdc-quick-deploy/inputs/SalesforceQuickDeployTaskSalesforceToolSelectInput";
import TextInputBase from "../../common/inputs/text/TextInputBase";
import TestDeployIdButton from "../../common/buttons/task/quick_deploy/TestDeployIdButton";
import SalesforceLogSummaryReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceLogSummaryReportPanel";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import snaplogicTaskConfigurationMetadata from "./tasks/snaplogic/snaplogicTaskConfigurationMetadata";
import SnaplogicProjectSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicProjectSelectInput";
import SnaplogicScmBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicScmBranchSelectInput";
import gitscraperTaskConfigurationMetadata from "./tasks/gitscraper/gitscraper-metadata";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";


// TODO: Remove and make individual overlays per task and wire them up in RunTaskButton to keep things isolated better
function RunTaskOverlay({ handleClose, taskModel, setTaskModel, loadData }) {
  const [taskConfigurationModel, setTaskConfigurationModel] =
    useState(undefined);
  const [canEdit, setCanEdit] = useState(false);
  const [report, setReport] = useState({});
  const {
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadRoles();
    loadConfig();
  }, []);

  const loadRoles = async () => {
    const gitTask = taskModel?.getPersistData();
    
    setCanEdit(
      TaskRoleHelper.canUpdateTask(
        userData,
        gitTask,
      ),
    );
  };

  const loadConfig = () => {
    let configurationData;
    const configuration = taskModel?.getData("configuration");
    switch (taskModel?.getData("type")) {
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
        configurationData = modelHelpers.parseObjectIntoModel(
          configuration,
          salesforceQuickDeployTaskConfigurationMetadata,
        );
        break;
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        configurationData = modelHelpers.parseObjectIntoModel(
          configuration,
          ec2ClusterCreationTaskConfigurationMetadata,
        );
        break;
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        configurationData = modelHelpers.parseObjectIntoModel(
          configuration,
          ec2ServiceCreationTaskConfigurationMetadata,
        );
        break;
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        configurationData = modelHelpers.parseObjectIntoModel(
          configuration,
          azureAksClusterTaskConfigurationMetadata,
        );
        break;
      case TASK_TYPES.SNAPLOGIC_TASK:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, snaplogicTaskConfigurationMetadata);
        break;
      case TASK_TYPES.GITSCRAPER:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, gitscraperTaskConfigurationMetadata);
        break;
      default:
        setTaskConfigurationModel(null);
        return;
    }

    setTaskConfigurationModel({ ...configurationData });
  };

  const getButtonContainer = () => {
    return (
      <Row className={"mx-0 p-3 d-flex"}>
        <div className={"ml-auto d-flex"}>
          <TriggerTaskRunButton
            gitTasksData={taskModel}
            setGitTasksData={setTaskModel}
            gitTasksConfigurationDataDto={taskConfigurationModel}
            loadData={loadData}
            handleClose={handleClose}
            className={"mr-2"}
          />
          <CloseButton
            closeEditorCallback={handleClose}
            showUnsavedChangesMessage={false}
          />
        </div>
      </Row>
    );
  };

  const quickDeployForm = () => {
    if (canEdit) {
      return (
        <Row>
          <Col lg={12}>
            <SalesforceQuickDeployTaskSalesforceToolSelectInput
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
          <Col lg={8}>
            <TextInputBase
              dataObject={taskConfigurationModel}
              setDataObject={setTaskConfigurationModel}
              fieldName={"deployKey"}
            />
          </Col>
          {taskConfigurationModel?.getData("deployKey") &&
            taskConfigurationModel?.getData("deployKey").length > 0 && (
            <Col lg={4}>
              <TestDeployIdButton
                taskModel={taskConfigurationModel}
                report={report}
                setReport={setReport}
              />
            </Col>
          )}
          {report && Object.keys(report).length > 0 && (
            <SalesforceLogSummaryReportPanel pipelineTaskData={report} />
          )}
        </Row>
      );
    }
  };

  const SnaplogicForm = () => {
    if (canEdit) {
      return (
        <Row>
          <Col lg={12}>
            <SnaplogicProjectSelectInput 
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
              toolConfigId={taskConfigurationModel?.getData("toolConfigId")}
              projectSpace={taskConfigurationModel?.getData("projectSpace")}
            />
          </Col>
          <Col lg={12}>
            <SnaplogicScmBranchSelectInput
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
        </Row>
      );
    }
  };

  // TODO: This should be put inside the first step of Wizards.
  const getRunView = () => {
    const type = taskModel?.getData("type");

    switch (type) {
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
        return quickDeployForm();
      case TASK_TYPES.SNAPLOGIC_TASK:
        return SnaplogicForm();
      default:
        return;
    }
  };

  if (taskModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={handleClose}
      showPanel={true}
      titleText={`Task Confirmation`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-lg-5 mb-2"}>
          <div className={"mb-3"}>
            Do you want to run this Task: {taskModel?.getData("name")}?
          </div>
          {getRunView()}
        </div>
      </OverlayPanelBodyContainer>
    </FullScreenCenterOverlayContainer>
  );
}

RunTaskOverlay.propTypes = {
  taskModel: PropTypes.object,
  setActiveTab: PropTypes.func,
  setTaskModel: PropTypes.func,
  loadData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default RunTaskOverlay;
