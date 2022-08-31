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
import SalesforceOrganizationSyncTaskWizardConfirmRepositorySettingsButton
  from "components/tasks/wizard/organization_sync/pre_run_tasks/SalesforceOrganizationSyncTaskWizardConfirmRepositorySettingsButton";
import SalesforceOrganizationSyncTaskGitBranchTextInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";

export default function SalesforceOrganizationSyncTaskWizardPreRunTaskScreen(
  {
    taskModel,
    setTaskModel,
    setCurrentScreen,
    className,
  }) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(undefined);
  const { toastContext } = useComponentStateReference();

  useEffect(() => {
    if (taskModel) {
      try {
        const configurationModel = modelHelpers.getToolConfigurationModel(taskModel?.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata);
        setTaskConfigurationModel({...configurationModel});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Task run:");
      }
    }
  }, [taskModel]);

  const getDynamicFields = () => {
    if (taskConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskGitBranchTextInput
              fieldName={"gitBranch"}
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
        </>
      );
    }
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Salesforce Task Run: Pre Run Tasks"}
      />
      <div>Please select the repository and branch you wish to use for this Salesforce workflow</div>
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
        {getDynamicFields()}
      </Row>
      <ButtonContainerBase>
        <SalesforceOrganizationSyncTaskWizardConfirmRepositorySettingsButton
          taskModel={taskModel}
          setTaskModel={setTaskModel}
          taskConfigurationModel={taskConfigurationModel}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

SalesforceOrganizationSyncTaskWizardPreRunTaskScreen.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};