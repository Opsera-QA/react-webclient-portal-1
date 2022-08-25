import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
//import ScreenContainer from "components/common/panels/general/ScreenContainer";

export default function FreeTrialInsightsLanding() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"insights"} />);

  return (
    <div className={"max-content-width mt-3 pt-3"}>
      {/*<ScreenContainer
        breadcrumbDestination={"freeTrialLanding"}
        includeSubNavigationGap={false}
      >
      TODO: Tejas we dont' want to have a outer "container" in this design so Todd commented out the above part.  Just leave it commented out please and work below.
      */}
      <div className={"m-3"}>
        <Row className={"pb-3"}>
          <Col xs={6}>
            PUT STUFF HERE!!!
          </Col>
          <Col xs={6}>
            more KPI stuff
          </Col>
        </Row>
        <div className={"mt-3 mx-auto pb-3"}>
          more KPI stuff
        </div>

      </div>
      {/*</ScreenContainer>*/}
    </div>
  );
}

FreeTrialInsightsLanding.propTypes = {};