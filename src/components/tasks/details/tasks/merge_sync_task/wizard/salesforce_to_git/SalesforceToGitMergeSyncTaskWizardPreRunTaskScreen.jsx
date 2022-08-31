import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import {
  mergeSyncTaskGitConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import SalesforceToGitMergeSyncTaskWizardConfirmRepositorySettingsButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardConfirmRepositorySettingsButton";
import SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceToGitMergeSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskRepositorySelectInput";
import SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput";
import SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SalesforceToGitMergeSyncTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskTargetBranchSelectInput";

export default function SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen(
  {
    taskModel,
    setTaskModel,
    setCurrentScreen,
    className,
  }) {
  const [gitConfigurationModel, setGitConfigurationModel] = useState(undefined);
  const { toastContext } = useComponentStateReference();

  useEffect(() => {
    if (taskModel) {
      try {
        const gitConfigurationModel = modelHelpers.getToolConfigurationModel(taskModel?.getData("configuration.git"), mergeSyncTaskGitConfigurationMetadata);
        setGitConfigurationModel({...gitConfigurationModel});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Task run:");
      }
    }
  }, [taskModel]);

  const getDestinationBranchInputs = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
              model={gitConfigurationModel}
              setModel={setGitConfigurationModel}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={gitConfigurationModel}
              setDataObject={setGitConfigurationModel}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setGitConfigurationModel}
        />
      </Col>
    );
  };

  if (taskModel == null || gitConfigurationModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Salesforce to Git Merge Sync Task Run: Pre Run Tasks"}
      />
      <div>Please select the repository and branch you wish to use for this Salesforce workflow</div>
      <Row>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput
            model={gitConfigurationModel}
            setModel={setGitConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskRepositorySelectInput
            model={gitConfigurationModel}
            setModel={setGitConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput
            model={gitConfigurationModel}
            setModel={setGitConfigurationModel}
          />
        </Col>
        {getDestinationBranchInputs()}
      </Row>
      <ButtonContainerBase>
        <SalesforceToGitMergeSyncTaskWizardConfirmRepositorySettingsButton
          taskModel={taskModel}
          setTaskModel={setTaskModel}
          gitConfigurationModel={gitConfigurationModel}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};