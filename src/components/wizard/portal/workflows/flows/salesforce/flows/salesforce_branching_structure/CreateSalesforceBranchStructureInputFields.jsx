import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayWizardButtonContainerBase from "../../../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterAccountContainer from "../../../tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../../temp-library-components/button/VanityButtonBase";
import H5FieldSubHeader from "../../../../../../../common/fields/subheader/H5FieldSubHeader";
import sfdcGitBranchTaskConfigurationMetadata from "../../../../../../../tasks/details/tasks/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import SalesforceOrganizationSyncTaskRepositorySelectInput from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SalesforceOrganizationSyncTaskGitBranchSelectInput from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import AgentLabelsSelectInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
  from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import SalesforceOrganizationSyncTaskBranchTypeSelectInput
  from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBranchTypeSelectInput";
import SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
  from "../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";

function CreateSalesforceBranchStructureInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(
    modelHelpers.parseObjectIntoNewModelBase(
      taskModel?.configuration,
      sfdcGitBranchTaskConfigurationMetadata,
        true
    ),
  );
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
          <SalesforceOrganizationSyncTaskBranchTypeSelectInput
              dataObject={taskConfigurationModel}
              setDataObject={setTaskConfigurationModel} />
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
          <SalesforceOrganizationSyncTaskRepositorySelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskGitBranchSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"destinationBranch"}
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
          />
        </Col>
        {getDynamicFields()}
      </Row>
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

CreateSalesforceBranchStructureInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default CreateSalesforceBranchStructureInputFields;
