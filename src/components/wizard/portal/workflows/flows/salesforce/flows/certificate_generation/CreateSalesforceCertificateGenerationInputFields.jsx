import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceBulkMigrationTaskJenkinsToolSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskJenkinsToolSelectInput";
import SalesforceBulkMigrationTaskSalesforceToolSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskSalesforceToolSelectInput";
import SalesforceBulkMigrationTaskJenkinsAccountSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskJenkinsAccountSelectInput";
import SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput";
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
import sfdxCertGenTaskConfigurationMetadata from "../../../../../../../tasks/details/tasks/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import SalesforceOrganizationSyncTaskJenkinsToolSelectInput from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsToolSelectInput";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import DateTimeInput from "../../../../../../../common/inputs/date/DateTimeInput";
import AgentLabelsSelectInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

function CreateSalesforceCertificateGenerationInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(
    modelHelpers.parseObjectIntoModel(
      taskModel?.configuration,
      sfdxCertGenTaskConfigurationMetadata,
    ),
  );
  const [parentConfig, setParentConfig] =    useState(modelHelpers.parseObjectIntoModel(taskModel, tasksMetadata));


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
    if (taskConfigurationModel.getData("autoScaleEnable") === true) {
      return (
        <Col lg={12}>
          <AgentLabelsSelectInput
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"agentLabels"}
          />
        </Col>
      );
    }
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
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"countryName"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"state"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"locality"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"organization"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"unitName"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"commonName"}
          />
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"email"}
          />
          <DateTimeInput
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"expiryDate"}
            minDate={new Date()}
            dropUp={true}
          />
        </Col>
        {getDynamicFields()}
      </Row>
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

CreateSalesforceCertificateGenerationInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default CreateSalesforceCertificateGenerationInputFields;
