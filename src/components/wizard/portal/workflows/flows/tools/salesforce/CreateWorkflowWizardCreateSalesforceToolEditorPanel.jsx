import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CreateFreeTrialSalesforceToolButton
  from "components/wizard/portal/workflows/flows/tools/salesforce/CreateFreeTrialSalesforceToolButton";
import CreateSalesforceWorkflowWizardSelectToolInputBase
  from "components/wizard/portal/workflows/flows/salesforce/CreateSalesforceWorkflowWizardSelectToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {faArrowRight, faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterToolHeaderText
  from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateWorkflowWizardRegisterAccountContainer
  from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../temp-library-components/button/VanityButtonBase";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "../../salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";

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
    setCurrentScreen,
    connectionFailure,
    setConnectionFailure,
    onSkipConnectionTestFunction
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
          {getButtons()}
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, [salesforceToolModel, currentToolCount, connectionFailure]);

  const getButtons = () => {
    if (connectionFailure) {
      return (
        <>
          <VanityButtonBase
            normalText={"Skip Connection Test"}
            disabled={false}
            buttonState={"ready"}
            className={"mr-2"}
            onClickFunction={onSkipConnectionTestFunction}
            tooltip={
              "The tool will not be usable in Tasks until the connection is resolved."
            }
            variant={"outline-warning"}
            icon={faTriangleExclamation}
          />
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
        </>
      );
    } else {
      return (
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
      );
    }
  };

  if (salesforceToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <CreateWorkflowWizardRegisterAccountContainer>
        <div>
          <SelectionIconCardBase
            selectedOption={"salesforce"}
            option={"salesforce"}
            highlightedBorderColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            titleBar={
              <IconTitleBar
                icon={
                  getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                }
                title={`Salesforce`}
                titleClassName={"mx-auto py-1"}
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
  setCurrentScreen: PropTypes.func,
  onSkipConnectionTestFunction: PropTypes.func,
  connectionFailure: PropTypes.bool,
  setConnectionFailure: PropTypes.func
};


