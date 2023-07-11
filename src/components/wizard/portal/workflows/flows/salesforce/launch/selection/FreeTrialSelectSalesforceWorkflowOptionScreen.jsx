import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS } from "components/wizard/portal/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption from "components/wizard/portal/workflows/flows/salesforce/selection/FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceSelectionCardBase from "temp-library-components/cards/salesforce/SalesforceSelectionCardBase";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function FreeTrialSelectSalesforceWorkflowOptionScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    isLoading,
    workspaceItems,
    className,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase />
      );
    }
  }, []);

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mt-3 mb-5 mx-3"}
          subheaderText={"Would you like to start a new Opsera Salesforce Workflow or launch an existing one?"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
          <SalesforceSelectionCardBase
            option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN}
            title={"Get Started Here!"}
            subTitle={""}
            onClickFunction={setCurrentScreen}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
          <FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption
            setCurrentScreen={setCurrentScreen}
            isLoading={isLoading}
            workspaceItems={workspaceItems}
            className={"mb-2"}
          />
        </Col>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
      </Row>
    </div>
  );
}

FreeTrialSelectSalesforceWorkflowOptionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  workspaceItems: PropTypes.array,
};


