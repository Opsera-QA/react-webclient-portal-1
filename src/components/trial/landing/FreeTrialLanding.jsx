import React from "react";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountStatusWidget from "components/trial/landing/widgets/AccountStatusWidget";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import FreeTrialLandingWorkflowWidget from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidget";
import FreeTrialLandingAccountStatsWidget from "components/trial/landing/widgets/FreeTrialLandingAccountStatsWidget";

export default function FreeTrialLanding() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"home"} />);

  return (
    <div className={"max-content-width"}
      // style={{paddingTop: "30px"}}
    >
      {/*<ScreenContainer
        breadcrumbDestination={"freeTrialLanding"}
        includeSubNavigationGap={false}
      >
      */}
        <div className={"my-3"}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} className={"my-3"}>
              <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"} />
              <WelcomeWidget
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className={"my-3"}>
              <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"} />
              {/*<AccountStatusWidget*/}
              {/*/>*/}
              <FreeTrialLandingAccountStatsWidget
              />
            </Col>
          </Row>
          <div className={"py-3"}>
            <FreeTrialLandingWorkflowWidget
            />
          </div>
          <div className={"py-3"}>
            &nbsp;
            {/* placeholder for some marketing icons and maybe some contant cinfo but for now just giving it some space*/}
          </div>
        </div>
      {/*</ScreenContainer>*/}
    </div>
  );
}

FreeTrialLanding.propTypes = {};