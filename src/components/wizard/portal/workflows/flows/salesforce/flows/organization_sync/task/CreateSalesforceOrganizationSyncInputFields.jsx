import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayWizardButtonContainerBase from "../../../../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterAccountContainer from "../../../../tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../../../temp-library-components/button/VanityButtonBase";
import H5FieldSubHeader from "../../../../../../../../common/fields/subheader/H5FieldSubHeader";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import AgentLabelsSelectInput from "../../../../../../../../common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import SalesforceOrganizationSyncTaskRepositorySelectInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SalesforceOrganizationSyncTaskGitBranchSelectInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import SalesforceOrganizationSyncTaskNewBranchToggleInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceOrganizationSyncTaskGitBranchTextInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput";
import salesforceOrganizationSyncTaskConfigurationMetadata from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
  from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
  from "../../../../../../../../tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";

function CreateSalesforceOrganizationSyncInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(
    modelHelpers.parseObjectIntoNewModelBase(
      taskModel?.configuration,
      salesforceOrganizationSyncTaskConfigurationMetadata,
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

  const getPackageXmlPathInput = () => {
    if (taskConfigurationModel?.getData("includePackageXml") === true) {
      return (
        <Col lg={12}>
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"packageXmlReferencePath"}
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
            visible={taskConfigurationModel?.getData("isNewBranch") !== true}
          />
        </Col>
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskNewBranchToggleInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        {taskConfigurationModel?.getData("isNewBranch") && (
          <>
            <Col lg={12}>
              <SalesforceOrganizationSyncTaskGitBranchTextInput
                fieldName={"gitBranch"}
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
                visible={
                  taskConfigurationModel?.getData("isNewBranch") === true
                }
              />
            </Col>
            <Col lg={12}>
              <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
              />
            </Col>
          </>
        )}
        {getDynamicFields()}
        <Col lg={12}>
          <SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
          />
        </Col>
        {getPackageXmlPathInput()}
      </Row>
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

CreateSalesforceOrganizationSyncInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default CreateSalesforceOrganizationSyncInputFields;
