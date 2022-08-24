import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { Button } from "react-bootstrap";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton(
  {
    setCurrentScreen,
    selectedFlow,
    className,
  }) {
  return (
    <div className={className}>
      <ButtonContainerBase>
        <Button
          disabled={hasStringValue(selectedFlow) !== true}
          onClick={() => setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN)}
          variant={"primary"}
        >
        <span>
          <IconBase
            icon={faCheckCircle}
            className={"mr-2"}
          />
          Confirm Flow
        </span>
        </Button>
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  selectedFlow: PropTypes.string,
  className: PropTypes.string,
};

