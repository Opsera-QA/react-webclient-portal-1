import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SFDCBuildTypeSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";
import CreateFreeTrialSalesforceToolButton
  from "components/wizard/free_trial/pipeline/salesforce_flow/salesforce_tool/CreateFreeTrialSalesforceToolButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel(
  {
    className,
    salesforceToolId,
    setSalesforceToolId,
    setCurrentScreen,
    salesforceToolModel,
    setSalesforceToolModel,
  }) {
  if (salesforceToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Enter your Source Salesforce Account details"}
      />
      <Row>
        <Col sm={12}>
          <TextInputBase
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"toolURL"}
          />
          <TextInputBase
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_client_id"}
          />
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_client_secret"}
          />
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_token"}
          />
          <VaultTextInput
            dataObject={salesforceToolModel}
            setDataObject={setSalesforceToolModel}
            fieldName={"sfdc_password"}
          />
          {/*<SFDCBuildTypeSelectInput*/}
          {/*  dataObject={salesforceToolModel}*/}
          {/*  setDataObject={setSalesforceToolModel}*/}
          {/*  fieldName={"buildType"}*/}
          {/*/>*/}
        </Col>
      </Row>
      <ButtonContainerBase>
        <CreateFreeTrialSalesforceToolButton
          salesforceToolModel={salesforceToolModel}
          setCurrentScreen={setCurrentScreen}
          setSalesforceToolId={setSalesforceToolId}
          salesforceToolId={salesforceToolId}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel.propTypes = {
  salesforceToolModel: PropTypes.object,
  setSalesforceToolModel: PropTypes.func,
  salesforceToolId: PropTypes.string,
  setSalesforceToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


