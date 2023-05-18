import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceLandingWelcomeWidget from "components/landing/v2/salesforce/SalesforceLandingWelcomeWidget";
import SalesforceLandingAccountStatsWidget from "components/landing/v2/salesforce/SalesforceLandingAccountStatsWidget";
import SalesforceLandingMyWorkflowsWidget from "components/landing/v2/salesforce/SalesforceLandingMyWorkflowsWidget";

export default function SalesforceLandingScreen() {
  return (
    <div className={"max-content-width"}
    >
      <div className={"mt-3 mb-5"}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <SalesforceLandingWelcomeWidget />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <SalesforceLandingAccountStatsWidget />
          </Col>
        </Row>
        <div className={"pt-3"}>
          <SalesforceLandingMyWorkflowsWidget />
        </div>
      </div>
    </div>
  );
}

SalesforceLandingScreen.propTypes = {};