import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import TaskWizardConfirmRepositorySettingsButton
  from "components/tasks/wizard/TaskWizardConfirmRepositorySettingsButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import GitToGitSyncTaskScmTypeSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskScmTypeSelectInput";
import GitToGitSyncTaskScmToolSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskScmToolSelectInput";
import GitToGitSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskBitbucketWorkspaceSelectInput";
import GitToGitSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskRepositorySelectInput";
import GitToGitSyncTaskSourceBranchSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskSourceBranchSelectInput";
import GitToGitSyncTaskDestinationBranchSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskDestinationBranchSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import branchToBranchGitTaskConfigurationMetadata
  from "components/tasks/details/tasks/branch-to-branch/branch-to-branch-git-task-configuration";

export default function GitToGitSyncTaskPreRunTaskScreen(
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
        const configurationModel = modelHelpers.getToolConfigurationModel(taskModel?.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
        setTaskConfigurationModel({...configurationModel});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Task run:");
      }
    }
  }, [taskModel]);

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

  const setModelFunction = (newModel) => {
    setTaskConfigurationModel({...newModel});
    taskModel?.setData("configuration", newModel?.getPersistData());
    setTaskModel({...taskModel});
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
          <GitToGitSyncTaskScmTypeSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <GitToGitSyncTaskScmToolSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
            toolIdentifier={taskConfigurationModel?.getData("service")}
          />
        </Col>
        <Col lg={12}>
          <GitToGitSyncTaskBitbucketWorkspaceSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <GitToGitSyncTaskRepositorySelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <GitToGitSyncTaskSourceBranchSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
            targetBranch={taskConfigurationModel?.getData("gitBranch")}
          />
        </Col>
        <Col lg={12}>
          <GitToGitSyncTaskDestinationBranchSelectInput
            model={taskConfigurationModel}
            setModel={setModelFunction}
            sourceBranch={taskConfigurationModel?.getData("sourceBranch")}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            dataObject={taskConfigurationModel}
            setDataObject={setModelFunction}
            fieldName={"deleteSourceBranch"}
          />
        </Col>
      </Row>
      <ButtonContainerBase
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={toastContext.clearOverlayPanel}
          />
        }
      >
        <TaskWizardConfirmRepositorySettingsButton
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
          disabled={taskConfigurationModel?.checkCurrentValidity() !== true}
        />
      </ButtonContainerBase>
    </div>
  );
}

GitToGitSyncTaskPreRunTaskScreen.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};