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
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import GitToGitMergeSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskUpstreamBranchSelectInput";
import GitToGitMergeSyncTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskTargetBranchSelectInput";
import GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput";
import GitToGitMergeSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskRepositorySelectInput";
import GitToGitMergeSyncTaskSourceBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskSourceBranchSelectInput";
import GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput";
import TaskWizardConfirmRepositorySettingsButton
  from "components/tasks/wizard/TaskWizardConfirmRepositorySettingsButton";
import MergeSyncTaskJiraIssueMultiSelectInput 
  from "components/tasks/details/tasks/merge_sync_task/inputs/MergeSyncTaskJiraIssueMultiSelectInput";

export default function GitToGitMergeSyncTaskWizardPreRunTaskScreen(
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
        toastContext.showInlineErrorMessage(error, "Error initializing Task run:");
      }
    }
  }, [taskModel]);

  const setModelFunction = (newModel) => {
    setGitConfigurationModel({...newModel});
    taskModel?.setData("configuration.git", newModel?.getPersistData());
    setTaskModel({...taskModel});
  };

  const getDestinationBranchInputs = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <GitToGitMergeSyncTaskUpstreamBranchSelectInput
              model={gitConfigurationModel}
              setModel={setModelFunction}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={gitConfigurationModel}
              setDataObject={setModelFunction}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <GitToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          sourceBranch={gitConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
    );
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

  if (taskModel == null || gitConfigurationModel == null) {
    return null;
  }

  return (
    <div className={className}>
      {getWelcomeText()}
      <H5FieldSubHeader
        subheaderText={"Git to Git Merge Sync Task Run: Pre Run Tasks"}
      />
      <div>Please select the repository and branch you wish to use for this Salesforce workflow</div>
      <Row>
      <Col lg={12}>
        <MergeSyncTaskJiraIssueMultiSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          jiraToolId={gitConfigurationModel?.getData("jiraToolId")}
          jiraProjectKey={gitConfigurationModel?.getData("jiraProjectKey")}
        />
      </Col>      
      <Col lg={12}>
        <GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
        <Col lg={12}>
          <GitToGitMergeSyncTaskRepositorySelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        {(gitConfigurationModel?.getData("jiraIssueIds") === undefined || gitConfigurationModel?.getData("jiraIssueIds")?.length === 0) && 
        <Col lg={12}>
          <GitToGitMergeSyncTaskSourceBranchSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
            targetBranch={gitConfigurationModel?.getData("targetBranch")}
          />
        </Col>}
        <Col lg={12}>
          <GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        {getDestinationBranchInputs()}
      </Row>
      <ButtonContainerBase>
        <TaskWizardConfirmRepositorySettingsButton
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
          disabled={gitConfigurationModel?.checkCurrentValidity() !== true}
        />
      </ButtonContainerBase>
    </div>
  );
}

GitToGitMergeSyncTaskWizardPreRunTaskScreen.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};