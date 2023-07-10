import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GitCustodianLandingWelcomeWidget from "components/landing/v2/git_custodian/GitCustodianLandingWelcomeWidget";
import GitCustodianLandingAccountStatsWidget
  from "components/landing/v2/git_custodian/GitCustodianLandingAccountStatsWidget";
import GitCustodianLandingMyWorkflowsWidget
  from "components/landing/v2/git_custodian/GitCustodianLandingMyWorkflowsWidget";

export default function GitCustodianLandingScreen() {
  return (
    <div className={"max-content-width"}
    >
      <div className={"mt-3 mb-5"}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <GitCustodianLandingWelcomeWidget />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <GitCustodianLandingAccountStatsWidget />
          </Col>
        </Row>
        <div className={"pt-3"}>
          <GitCustodianLandingMyWorkflowsWidget />
        </div>
      </div>
    </div>
  );
}

GitCustodianLandingScreen.propTypes = {};