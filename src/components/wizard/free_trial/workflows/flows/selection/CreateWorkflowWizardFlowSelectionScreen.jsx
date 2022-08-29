import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import SalesforceSelectionCardBase from "temp-library-components/cards/salesforce/SalesforceSelectionCardBase";
import OpseraInfinityLogoSelectionCardBase
  from "temp-library-components/cards/opsera/OpseraInfinityLogoSelectionCardBase";
import GitSelectionCardBase from "temp-library-components/cards/git/GitSelectionCardBase";
import { CREATE_WORKFLOW_WIZARD_SCREENS } from "components/wizard/free_trial/workflows/CreateWorkflowWizard";

export const WORKFLOW_CREATION_OPTIONS = {
  SALESFORCE: "salesforce",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "sdlc",
  GIT_CUSTODIAN: "git_custodian",
};

export const WORKFLOW_CREATION_OPTION_LABELS = {
  SALESFORCE: "Salesforce.com",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "Software Development Life Cycle",
  GIT_CUSTODIAN: "Git Custodian",
};

export default function CreateWorkflowWizardFlowSelectionScreen(
  {
    className,
    setCurrentScreen,
  }) {
  const handleContinueButtonFunction = (selectedFlow) => {
    switch (selectedFlow) {
      case WORKFLOW_CREATION_OPTIONS.SALESFORCE:
        setCurrentScreen(CREATE_WORKFLOW_WIZARD_SCREENS.SALESFORCE_FLOW);
        return;
      case WORKFLOW_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE:
        setCurrentScreen(CREATE_WORKFLOW_WIZARD_SCREENS.SDLC_FLOW);
        return;
    }
  };

  return (
    <div className={className}>
      <Row>
        <Col xs={6} lg={4}>
          <SalesforceSelectionCardBase
            option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN}
            title={"Create Salesforce Workflow"}
            subTitle={"Set up a new Salesforce Workflow"}
            onClickFunction={handleContinueButtonFunction}
            className={"my-2"}
          />
        </Col>
        <Col xs={6} lg={4}>
          <OpseraInfinityLogoSelectionCardBase
            className={"my-2"}
            onClickFunction={handleContinueButtonFunction}
            option={WORKFLOW_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
            title={WORKFLOW_CREATION_OPTION_LABELS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
            subTitle={"Set up a Software Development Life Cycle Workflow"}
            disabled={true}
          />
        </Col>
        <Col xs={6} lg={4}>
          <GitSelectionCardBase
            className={"my-2"}
            onClickFunction={handleContinueButtonFunction}
            option={WORKFLOW_CREATION_OPTIONS.GIT_CUSTODIAN}
            title={WORKFLOW_CREATION_OPTION_LABELS.GIT_CUSTODIAN}
            subTitle={"Set up a Git Custodian Workflow"}
            disabled={true}
          />
        </Col>
      </Row>
    </div>
  );
}

CreateWorkflowWizardFlowSelectionScreen.propTypes = {
  className: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

