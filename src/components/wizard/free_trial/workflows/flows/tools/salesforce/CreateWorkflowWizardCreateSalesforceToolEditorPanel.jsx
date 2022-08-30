import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CreateFreeTrialSalesforceToolButton
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateFreeTrialSalesforceToolButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CreateSalesforceWorkflowWizardToolInputBase
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizardToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";

const getButtonContainer = (
  backButtonFunction,
  salesforceToolModel,
  onSuccessFunction,
  salesforceToolId,
  setSalesforceToolId,
  ) => {
  return (
    <ButtonContainerBase
      leftSideButtons={getLeftHandButtons(backButtonFunction)}
      className={"p-3"}
    >
      <CreateFreeTrialSalesforceToolButton
        salesforceToolModel={salesforceToolModel}
        onSuccessFunction={onSuccessFunction}
        setSalesforceToolId={setSalesforceToolId}
        salesforceToolId={salesforceToolId}
      />
    </ButtonContainerBase>
  );
};

const getLeftHandButtons = () => {
  return (
    <div className={"d-flex"}>
      <BackButtonBase
        disabled={true}
        className={"mr-2"}
      />
      <CancelOverlayButton />
    </div>
  );
};

export default function CreateWorkflowWizardCreateSalesforceToolEditorPanel(
  {
    className,
    salesforceToolId,
    setSalesforceToolId,
    onSuccessFunction,
    salesforceToolModel,
    setSalesforceToolModel,
    backButtonFunction,
    setButtonContainer,
    type,
  }) {

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        getButtonContainer(
          backButtonFunction,
          salesforceToolModel,
          onSuccessFunction,
          salesforceToolId,
          setSalesforceToolId,
        )
      );
    }
  }, []);

  if (salesforceToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={`Enter your ${type} Salesforce Account details`}
      />
      <Row>
        <Col sm={12}>
          <CreateSalesforceWorkflowWizardToolInputBase
            model={salesforceToolModel}
            setModel={setSalesforceToolModel}
            toolId={salesforceToolId}
            setToolId={setSalesforceToolId}
            toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}
          />
        </Col>
        <Col sm={12}>
          <TextInputBase
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"toolURL"}
          />
        </Col>
        <Col sm={12}>
          <TextInputBase
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"accountUsername"}
          />
        </Col>
        <Col sm={12}>
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_client_id"}
          />
        </Col>
        <Col sm={12}>
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_client_secret"}
          />
        </Col>
        <Col sm={12}>
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_token"}
          />
        </Col>
        <Col sm={12}>
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_password"}
          />
        </Col>
        {/*<Col sm={12}>*/}
        {/*<SFDCBuildTypeSelectInput*/}
        {/*  dataObject={salesforceToolModel}*/}
        {/*  setDataObject={setSalesforceToolModel}*/}
        {/*  fieldName={"buildType"}*/}
        {/*/>*/}
        {/*</Col>*/}
      </Row>
      <ButtonContainerBase>
        <CreateFreeTrialSalesforceToolButton
          salesforceToolModel={salesforceToolModel}
          onSuccessFunction={onSuccessFunction}
          setSalesforceToolId={setSalesforceToolId}
          salesforceToolId={salesforceToolId}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateWorkflowWizardCreateSalesforceToolEditorPanel.propTypes = {
  salesforceToolModel: PropTypes.object,
  setSalesforceToolModel: PropTypes.func,
  salesforceToolId: PropTypes.string,
  setSalesforceToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};


