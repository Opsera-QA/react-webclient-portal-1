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
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButton from "components/common/buttons/back/BackButton";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";

export const WORKFLOW_CREATION_OPTIONS = {
  SALESFORCE: "salesforce",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "sdlc",
  GIT_CUSTODIAN: "git_custodian",
};

export const WORKFLOW_CREATION_OPTION_LABELS = {
  SALESFORCE: "Salesforce",
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

  const getLeftHandButtons = () => {
    return (
      <BackButton
        icon={faArrowLeft}

      />
    );
  };

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={"What kind of Workflow would you like to create today?"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={4}>
          <SalesforceSelectionCardBase
            option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN}
            title={WORKFLOW_CREATION_OPTION_LABELS.SALESFORCE}
            subTitle={"Set up a new Salesforce Workflow"}
            onClickFunction={handleContinueButtonFunction}
          />
          <div className={"d-md-block d-lg-block d-xl-none mb-2"} />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={4}>
          <div className={"d-sm-block d-md-none d-lg-none d-xl-none mt-4"} />
          <OpseraInfinityLogoSelectionCardBase
            onClickFunction={handleContinueButtonFunction}
            option={WORKFLOW_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
            title={WORKFLOW_CREATION_OPTION_LABELS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
            subTitle={"Set up a new Software Development Life Cycle Workflow"}
            disabled={true}
          />
          <div className={"d-md-block d-lg-block d-xl-none mb-4"} />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={4}>
          <div className={"d-md-block d-lg-block d-xl-none mt-4"} />
          <GitSelectionCardBase
            onClickFunction={handleContinueButtonFunction}
            option={WORKFLOW_CREATION_OPTIONS.GIT_CUSTODIAN}
            title={WORKFLOW_CREATION_OPTION_LABELS.GIT_CUSTODIAN}
            subTitle={"Set up a new Git Custodian Workflow"}
            disabled={true}
          />
        </Col>
      </Row>
      <ButtonContainerBase

      />
    </div>
  );
}

CreateWorkflowWizardFlowSelectionScreen.propTypes = {
  className: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

