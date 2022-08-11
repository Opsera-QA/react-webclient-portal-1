import React from "react";
import PropTypes from "prop-types";
import PipelineLandingDataBlockWidgets
  from "components/trial/pipelines/data_blocks/PipelineLandingDataBlockWidgets";
import PipelineWidgetsHeader from "components/trial/pipelines/widgets/PipelineWidgetsHeader";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountStatusWidget from "components/trial/landing/widgets/AccountStatusWidget";
import PipelineWizardWidgets from "components/trial/landing/widgets/PipelineWizardWidgets";

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
        <PipelineWizardWidgets />
      </div>
      <div className={"mt-3"}>
        <PipelineWidgetsHeader />
      </div>
      <div>
        <PipelineWidgetsBody />
      </div>
    </div>
  );
}

FreeTrialLanding.propTypes = {};