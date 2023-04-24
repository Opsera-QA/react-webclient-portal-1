import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
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
import TaskWizardConfirmRepositorySettingsButton
  from "components/tasks/wizard/TaskWizardConfirmRepositorySettingsButton";
import SalesforceOrganizationSyncTaskGitBranchTextInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";

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
        const configurationModel = modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata);
        setTaskConfigurationModel({...configurationModel});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Task run:");
      }
    }
  }, [taskModel]);

  const setModelFunction = (newModel) => {
    setTaskConfigurationModel({...newModel});
    taskModel?.setData("configuration", newModel?.getPersistData());
    setTaskModel({...taskModel});
  };

  const getDynamicFields = () => {
    if (taskConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskGitBranchTextInput
              fieldName={"gitBranch"}
              model={taskConfigurationModel}
              setModel={setModelFunction}
            />
          </Col>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
              model={taskConfigurationModel}
              setModel={setModelFunction}
            />
          </Col>
        </>
      );
    }
  };

  const getWelcomeText = () => {
    return (
      <div className={"mt-3 mb-4"}>
        <CenteredContentWrapper>
          <div className={"mx-auto"}>
            <OpseraInfinityLogo />
          </div>
        </CenteredContentWrapper>
        <CenteredContentWrapper>
          <div className={"mx-auto mt-3"}>
            <div className={"focusText"}>Welcome to the Start Task Wizard! Please complete these steps in order to start your Task.</div>
          </div>
        </CenteredContentWrapper>
      </div>
    );
  };

  const getBranchNameParams = () => {
    const model = taskModel.getData('configuration');
    return ({
      toolId: model.gitToolId,
      branchName: model.defaultBranch,
      repositoryId: model.projectId,
      service: model.service,
      workspace: model.service === 'bitbucket' ? model.workspace : undefined,
      isNewBranch: model.isNewBranch,
      upstreamBranch: model.upstreamBranch,
    });
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return null;
  }

  return (
    <div className={className}>
      {getWelcomeText()}
      <H5FieldSubHeader
        subheaderText={"Salesforce Task Run: Pre Run Tasks"}
      />
      <div>Please select the repository and branch you wish to use for this Salesforce workflow</div>
      <Row>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskRepositorySelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskGitBranchSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
            visible={taskConfigurationModel?.getData("isNewBranch") !== true}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskNewBranchToggleInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        {getDynamicFields()}
      </Row>
      <ButtonContainerBase>
        <TaskWizardConfirmRepositorySettingsButton
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
          disabled={taskConfigurationModel?.checkCurrentValidity() !== true}
          validateBranchNameParams={getBranchNameParams()}
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