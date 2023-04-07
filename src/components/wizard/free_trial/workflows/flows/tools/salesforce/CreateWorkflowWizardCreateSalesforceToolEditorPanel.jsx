import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CreateFreeTrialSalesforceToolButton
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateFreeTrialSalesforceToolButton";
import CreateSalesforceWorkflowWizardSelectToolInputBase
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizardSelectToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterToolHeaderText
  from "components/wizard/free_trial/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateWorkflowWizardRegisterAccountContainer
  from "components/wizard/free_trial/workflows/flows/tools/CreateWorkflowWizardRegisterAccountContainer";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";

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
    toolType,
  }) {
  const [currentToolCount, setCurrentToolCount] = useState(0);
  const {
    themeConstants,
  } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        >
          <CreateFreeTrialSalesforceToolButton
            salesforceToolModel={salesforceToolModel}
            onSuccessFunction={onSuccessFunction}
            setSalesforceToolId={setSalesforceToolId}
            salesforceToolId={salesforceToolId}
            customLabel={"Next"}
            icon={faArrowRight}
            variant={"success"}
            currentCount={currentToolCount}
          />
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, [salesforceToolModel, currentToolCount]);

  if (salesforceToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <CreateWorkflowWizardRegisterAccountContainer>
        <div>
          <SelectionIconCard
            selectedOption={"salesforce"}
            option={"salesforce"}
            highlightedBorderColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            titleBar={
              <CardIconTitleBar
                formattedIcon={
                  getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                }
                title={`Salesforce`}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </div>
        <CreateWorkflowWizardRegisterToolHeaderText
          toolType={toolType}
          toolName={"Salesforce"}
          className={"mt-3"}
        />
        <Row>
          <Col sm={12}>
            <CreateSalesforceWorkflowWizardSelectToolInputBase
              model={salesforceToolModel}
              setModel={setSalesforceToolModel}
              toolId={salesforceToolId}
              setToolId={setSalesforceToolId}
              toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}
              setCurrentToolCount={setCurrentToolCount}
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
              fieldName={"sfdc_password"}
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
          {/*<Col sm={12}>*/}
          {/*<SFDCBuildTypeSelectInput*/}
          {/*  dataObject={salesforceToolModel}*/}
          {/*  setDataObject={setSalesforceToolModel}*/}
          {/*  fieldName={"buildType"}*/}
          {/*/>*/}
          {/*</Col>*/}
        </Row>
      </CreateWorkflowWizardRegisterAccountContainer>
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
  toolType: PropTypes.string,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};


