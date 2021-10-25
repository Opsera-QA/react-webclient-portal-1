import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import CloseButton from "components/common/buttons/CloseButton";
import TriggerTaskRunButton from "components/tasks/buttons/run_task/TriggerTaskRunButton";
import SalesforceOrganizationSyncTaskNewBranchToggleInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import salesforceOrganizationSyncTaskConfigurationMetadata from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import ec2ClusterCreationTaskConfigurationMetadata from "components/tasks/details/tasks/ecs-cluster-creation/ecs-creation-git-task-configuration";
import sfdxCertGenTaskConfigurationMetadata from "components/tasks/details/tasks/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/tasks/details/tasks/branch-to-branch/branch-to-branch-git-task-configuration";
import sfdcGitBranchTaskConfigurationMetadata from "components/tasks/details/tasks/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import ec2ServiceCreationTaskConfigurationMetadata from "components/tasks/details/tasks/ecs-service-creation/ecs-service-creation-git-task-configuration";
import {AuthContext} from "contexts/AuthContext";
import SalesforceOrganizationSyncTaskGitBranchTextInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import workflowAuthorizedActions
from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {TASK_TYPES} from "components/tasks/task.types";
import SfdcOrgSyncPrerunHelpDocumentation
  from "components/common/help/documentation/tasks/SfdcOrgSyncPrerunHelpDocumentation";
import azureAksClusterTaskConfigurationMetadata
  from "components/tasks/details/tasks/azure-cluster-creation/azure-cluster-metadata";
import SalesforceOrganizationSyncTaskGitBranchSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import {salesforceBulkMigrationTaskConfigurationMetadata} from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";

function RunTaskOverlay({ handleClose, taskModel, setTaskModel, loadData }) {
  const [showHelp, setShowHelp] = useState(false);
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(undefined);
  const [canEdit, setCanEdit] = useState(false);
  const { getAccessRoleData } = useContext(AuthContext);

  useEffect(() => {
    loadRoles();
    loadConfig();
  }, []);

  const loadRoles = async() => {
    const customerAccessRules = await getAccessRoleData();
    const gitTask = taskModel?.getPersistData();
    setCanEdit(workflowAuthorizedActions.gitItems(customerAccessRules, "edit_settings", gitTask.owner, gitTask.roles));
  };

  const loadConfig = () => {
    let configurationData;
    const configuration = taskModel?.getData("configuration");
    switch (taskModel?.getData("type")) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, salesforceOrganizationSyncTaskConfigurationMetadata);
        break;
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, sfdxCertGenTaskConfigurationMetadata);
        break;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, sfdcGitBranchTaskConfigurationMetadata);
        break;
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, salesforceBulkMigrationTaskConfigurationMetadata);
        break;
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, branchToBranchGitTaskConfigurationMetadata);
        break;
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, ec2ClusterCreationTaskConfigurationMetadata);
        break;
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, ec2ServiceCreationTaskConfigurationMetadata);
        break;
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        configurationData = modelHelpers.parseObjectIntoModel(configuration, azureAksClusterTaskConfigurationMetadata);
        break;
      default:
        setTaskConfigurationModel(null);
        return;
    }

    setTaskConfigurationModel({...configurationData});
  };

  const getButtonContainer = () => {
    return (
      <Row className="mx-0 p-3 d-flex">
        <div className="ml-auto d-flex">
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

  const getRunView = () => {
    if (canEdit && taskModel?.getData("type") === TASK_TYPES.SYNC_SALESFORCE_REPO) {
      return (
        <div style={{minHeight: "400px"}}>
          <Row className={"m-3"}>
            <Col lg={12}>
              <SalesforceOrganizationSyncTaskGitBranchSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
                visible={taskConfigurationModel?.getData("isNewBranch") !== true}/>
            </Col>
            <Col lg={12}>
              <SalesforceOrganizationSyncTaskNewBranchToggleInput model={taskConfigurationModel} setModel={setTaskConfigurationModel}/>
            </Col>
            {taskConfigurationModel?.getData("isNewBranch") &&
            <>
              <Col lg={12}>
                <SalesforceOrganizationSyncTaskGitBranchTextInput
                  fieldName={"gitBranch"}
                  model={taskConfigurationModel}
                  setModel={setTaskConfigurationModel}
                  visible={taskConfigurationModel?.getData("isNewBranch") === true}
                />
              </Col>
              <Col lg={12}>
                <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
                  model={taskConfigurationModel}
                  setModel={setTaskConfigurationModel}
                />
              </Col>
            </>
            }
          </Row>
        </div>
      );
    }
  };

  const getHelpComponent = () => {
    switch (taskModel?.getData("type")) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (<SfdcOrgSyncPrerunHelpDocumentation closeHelpPanel={() => setShowHelp(false)}/>);
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      case TASK_TYPES.SYNC_GIT_BRANCHES:
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
      default:
        return null;
    }
  };

  if (taskModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ConfirmationOverlay
      closePanel={handleClose}
      showPanel={true}
      titleText={`Opsera Task Confirmation`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        helpComponent={getHelpComponent()}
        helpIsShown={showHelp}
        setHelpIsShown={setShowHelp}
        hideCloseButton={true}
      >
        <div className={"mb-3 mx-3"}>Do you want to run this Task: {taskModel?.getData("name")}?</div>
        {getRunView()}
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
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