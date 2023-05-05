import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SoftwareDevelopmentLandingMyWorkflowsWidget
  from "components/landing/v2/widgets/workspace/SoftwareDevelopmentLandingMyWorkflowsWidget";
import SoftwareDevelopmentLandingAccountStatsWidget
  from "components/landing/v2/widgets/SoftwareDevelopmentLandingAccountStatsWidget";
import SoftwareDevelopmentLandingWelcomeWidget
  from "components/landing/v2/widgets/SoftwareDevelopmentLandingWelcomeWidget";

export default function SoftwareDevelopmentLandingScreen() {
  return (
    <div className={"max-content-width"}
    >
      <div className={"mt-3 mb-5"}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <SoftwareDevelopmentLandingWelcomeWidget />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <SoftwareDevelopmentLandingAccountStatsWidget />
          </Col>
        </Row>
        <div className={"pt-3"}>
          <SoftwareDevelopmentLandingMyWorkflowsWidget />
        </div>
      </div>
    </div>
  );
}

SoftwareDevelopmentLandingScreen.propTypes = {};