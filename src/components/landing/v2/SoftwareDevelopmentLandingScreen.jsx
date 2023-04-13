import React from "react";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SoftwareDevelopmentLandingWorkspaceWidget
  from "components/landing/v2/widgets/workspace/SoftwareDevelopmentLandingWorkspaceWidget";
import SoftwareDevelopmentLandingAccountStatsWidget
  from "components/landing/v2/widgets/SoftwareDevelopmentLandingAccountStatsWidget";

export default function SoftwareDevelopmentLandingScreen() {
  return (
    <div className={"max-content-width"}
    >
      <div className={"my-3"}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <WelcomeWidget />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <SoftwareDevelopmentLandingAccountStatsWidget />
          </Col>
        </Row>
        <div className={"py-3"}>
          <SoftwareDevelopmentLandingWorkspaceWidget />
        </div>
        <div className={"py-3"}>
        </div>
      </div>
    </div>
  );
}

SoftwareDevelopmentLandingScreen.propTypes = {};