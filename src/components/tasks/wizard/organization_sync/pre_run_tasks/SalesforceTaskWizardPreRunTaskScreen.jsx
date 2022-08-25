import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import jenkinsPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforcePipelineWizardBranchSelectInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/inputs/SalesforcePipelineWizardBranchSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import SalesforcePipelineWizardConfirmRepositorySettingsButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/SalesforcePipelineWizardConfirmRepositorySettingsButton";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceOrganizationSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SalesforceOrganizationSyncTaskGitBranchSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import SalesforceOrganizationSyncTaskNewBranchToggleInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceTaskWizardConfirmRepositorySettingsButton
  from "components/tasks/wizard/organization_sync/pre_run_tasks/SalesforceTaskWizardConfirmRepositorySettingsButton";

// Please note this will only work with org sync tasks. I will break it up to support other task wizards eventually.
export default function SalesforceTaskWizardPreRunTaskScreen(
  {
    task,
    setTask,
    setCurrentScreen,
    className,
  }) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(undefined);
  const { toastContext } = useComponentStateReference();

  useEffect(() => {
    if (task) {
      try {
        const taskModel = modelHelpers.getToolConfigurationModel(task?.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata);
        setTaskConfigurationModel({...taskModel});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Task run:");
      }
    }
  }, [task]);

  if (task == null || taskConfigurationModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Salesforce Task Run: Pre Run Tasks"}
      />
      <div>Please select the repository and branch you wish to use during for this Salesforce workflow</div>
      <Row>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskRepositorySelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskGitBranchSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
            visible={taskConfigurationModel?.getData("isNewBranch") !== true}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskNewBranchToggleInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
      </Row>
      <ButtonContainerBase>
        <SalesforceTaskWizardConfirmRepositorySettingsButton
          task={task}
          setTask={setTask}
          taskConfigurationModel={taskConfigurationModel}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

SalesforceTaskWizardPreRunTaskScreen.propTypes = {
  task: PropTypes.object,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};