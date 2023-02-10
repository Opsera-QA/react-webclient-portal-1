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
import {
  salesforceBulkMigrationTaskConfigurationMetadata
} from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";
import SalesforceBulkMigrationTaskGitBranchTextInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchTextInput";
import SalesforceBulkMigrationTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskUpstreamBranchSelectInput";
import SalesforceBulkMigrationTaskGitBranchSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchSelectInput";
import SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput";
import SalesforceBulkMigrationTaskRepositorySelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskRepositorySelectInput";
import SalesforceBulkMigrationTaskNewBranchToggleInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskNewBranchToggleInput";
import TriggerSalesforceBranchStructureTaskRunButton
  from "components/tasks/details/tasks/sfdc-branch-structure/run/TriggerSalesforceBranchStructureTaskRunButton";
import CancelButton from "components/common/buttons/CancelButton";

export default function SalesforceBranchStructureTaskRunTaskConfirmationScreen(
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
        const configurationModel = modelHelpers.getToolConfigurationModel(taskModel?.getData("configuration"), salesforceBulkMigrationTaskConfigurationMetadata);
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
            <SalesforceBulkMigrationTaskGitBranchTextInput
              fieldName={"gitBranch"}
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
              visible={taskConfigurationModel?.getData("isNewBranch") === true}
            />
          </Col>
          <Col lg={12}>
            <SalesforceBulkMigrationTaskUpstreamBranchSelectInput
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceBulkMigrationTaskGitBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          visible={taskConfigurationModel?.getData("isNewBranch") !== true}
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
          <SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceBulkMigrationTaskRepositorySelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceBulkMigrationTaskNewBranchToggleInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        {getDynamicFields()}
      </Row>
      <ButtonContainerBase>
        <CancelButton
          size={"1x"}
          cancelFunction={toastContext.clearOverlayPanel}
        />
        <TriggerSalesforceBranchStructureTaskRunButton
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
          disabled={taskConfigurationModel?.checkCurrentValidity() !== true}
        />
      </ButtonContainerBase>
    </div>
  );
}

SalesforceBranchStructureTaskRunTaskConfirmationScreen.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};