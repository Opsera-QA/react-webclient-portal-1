import React from "react";
import WelcomeWidget from "components/trial/landing/widgets/WelcomeWidget";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountStatusWidget from "components/trial/landing/widgets/AccountStatusWidget";
import FreeTrialLandingWizardWidgets from "components/trial/landing/widgets/wizard/FreeTrialLandingWizardWidgets";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
//import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialLandingPipelinesWidgetV1 from "components/trial/pipelines/widgets/FreeTrialLandingPipelinesWidgetV1";
import SFDCLandingWidget from "./widgets/SFDCLandingWidget";
import FreeTrialLandingSalesforceWidget from "components/trial/landing/widgets/FreeTrialLandingSalesforceWidget";
import FreeTrialLandingWorkflowWidget from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidget";

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
            <Col xs={12} md={6} className={"my-3 d-flex"}>
              <WelcomeWidget
                className={"h-100"}
              />
            </Col>
            <Col xs={12} md={6} className={"my-3"}>
              <AccountStatusWidget
                className={"h-100"}
              />
            </Col>
          </Row>
          <div className={"py-3 mx-auto"}>
            {/*<FreeTrialLandingWizardWidgets />*/}
            <FreeTrialLandingSalesforceWidget className={"mx-4"} />
            {/*<SFDCLandingWidget />*/}
          </div>
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