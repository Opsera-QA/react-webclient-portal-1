import React from "react";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountStatusWidget from "components/trial/landing/widgets/AccountStatusWidget";
import FreeTrialLandingWizardWidgets from "components/trial/landing/widgets/wizard/FreeTrialLandingWizardWidgets";
import FreeTrialLandingPipelineWidgets from "components/trial/landing/widgets/FreeTrialLandingPipelineWidgets";

export default function FreeTrialLanding() {
  return (
    <div className={"max-content-width"}>
      <div className={"mt-3"}>
        <Row>
          <Col xs={6}>
            <WelcomeWidget />
          </Col>
          <Col xs={6}>
            <AccountStatusWidget />
          </Col>
        </Row>
      </div>
      <div className={"mt-3 mx-auto"}>
        <FreeTrialLandingWizardWidgets />
      </div>
      <div className={"mt-3"}>
        <FreeTrialLandingPipelineWidgets />
      </div>
    </div>
  );
}

FreeTrialLanding.propTypes = {};