import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceBulkMigrationTaskRepositorySelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskRepositorySelectInput";
import SalesforceBulkMigrationTaskNewBranchToggleInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskNewBranchToggleInput";
import SalesforceBulkMigrationTaskGitBranchTextInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchTextInput";
import SalesforceBulkMigrationTaskUpstreamBranchSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskUpstreamBranchSelectInput";
import SalesforceBulkMigrationTaskGitBranchSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchSelectInput";
import { salesforceBulkMigrationTaskConfigurationMetadata } from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";
import OverlayWizardButtonContainerBase from "../../../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterAccountContainer from "../../../tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../../temp-library-components/button/VanityButtonBase";
import H5FieldSubHeader from "../../../../../../../common/fields/subheader/H5FieldSubHeader";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import SalesforceOrganizationSyncTaskJenkinsAccountSelectInput from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";

function CreateSalesforceBulkMigrationInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] =
    useState(modelHelpers.parseObjectIntoNewModelBase(taskModel?.configuration, salesforceBulkMigrationTaskConfigurationMetadata, true));
  const [parentConfig, setParentConfig] =    useState(modelHelpers.parseObjectIntoNewModelBase(taskModel, tasksMetadata, true));

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase>
          {getButtons()}
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, []);

  const updateToolSpecificDetails = () => {
    let newDataObject = taskModel;
    newDataObject.configuration = taskConfigurationModel.getPersistData();
    newDataObject.name = parentConfig?.getData("name");
    newDataObject.description = parentConfig?.getData("description");
    newDataObject.tool_identifier = parentConfig?.getData("tool_identifier");
    setTaskModel(newDataObject);
    onSuccessFunction();
  };

  const getButtons = () => {
    return (
      <VanityButtonBase
        busyText={"Saving"}
        disabled={false}
        buttonState={"ready"}
        onClickFunction={updateToolSpecificDetails}
        customLabel={"Next"}
        normalText={"Next"}
        icon={faArrowRight}
        variant={"success"}
      />
    );
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

  if (taskModel == null || taskConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <CreateWorkflowWizardRegisterAccountContainer>
      <div className={"mt-3"}>
        <h4>Additional Task Configuration</h4>
        <H5FieldSubHeader
          subheaderText={`Complete the additional task configuration options before running the task.`}
        />
      </div>
      <Row>
        <Col lg={12}>
          <TextInputBase dataObject={parentConfig} setDataObject={setParentConfig} fieldName={"name"} />
        </Col>
        <Col lg={12}>
          <TextInputBase dataObject={parentConfig} setDataObject={setParentConfig} fieldName={"description"} />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
            taskModel={parentConfig}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
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
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

CreateSalesforceBulkMigrationInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default CreateSalesforceBulkMigrationInputFields;
