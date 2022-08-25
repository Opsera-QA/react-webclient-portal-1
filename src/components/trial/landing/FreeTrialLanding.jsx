import React from "react";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountStatusWidget from "components/trial/landing/widgets/AccountStatusWidget";
import FreeTrialLandingWizardWidgets from "components/trial/landing/widgets/wizard/FreeTrialLandingWizardWidgets";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialLandingPipelinesWidget from "components/trial/pipelines/widgets/FreeTrialLandingPipelinesWidget";

export default function FreeTrialLanding() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"home"} />);

  return (
    <div className={"max-content-width mt-3 pt-3"}>
      {/*<ScreenContainer
        breadcrumbDestination={"freeTrialLanding"}
        includeSubNavigationGap={false}
      >
      TODO: Noah, if you want to restore this with an option to toggle
      header / border visilibty that is fine too.
      */}
        <div className={"m-3"}>
          <Row className={"pb-3"}>
            <Col xs={6}>
              <WelcomeWidget />
            </Col>
            <Col xs={6}>
              <AccountStatusWidget />
            </Col>
          </Row>
          <div className={"mt-3 mx-auto pb-3"}>
            <FreeTrialLandingWizardWidgets />
          </div>
          <div className={"mt-3"}>
            <FreeTrialLandingPipelinesWidget />
          </div>
        </div>
      {/*</ScreenContainer>*/}
    </div>
  );
}

FreeTrialLanding.propTypes = {};