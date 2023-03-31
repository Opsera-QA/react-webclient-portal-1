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
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import salesforceQuickDeployTaskConfigurationMetadata from "../../../../../../../tasks/details/tasks/sfdc-quick-deploy/salesforceQuickDeployTaskConfigurationMetadata";

function CreateSalesforceQuickDeployInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(
    modelHelpers.parseObjectIntoModel(
      taskModel?.configuration,
      salesforceQuickDeployTaskConfigurationMetadata,
    ),
  );

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
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"deployKey"}
          />
        </Col>
      </Row>
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

CreateSalesforceQuickDeployInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default CreateSalesforceQuickDeployInputFields;
