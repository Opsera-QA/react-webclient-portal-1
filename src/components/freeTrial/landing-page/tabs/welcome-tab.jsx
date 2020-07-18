import React from "react";
import { Row, Col } from "react-bootstrap";

import "../../freeTrial.css";

function FreeTrialLandingWelcome() {

  return (
    <>
      <div className="content-block">
        <div className="mt-3 ml-5 w-75">
          <Row>
            <Col xl="12">
              <div style={{ maxWidth: "1025px" }}>
                <div className="h5 mb-3">Welcome to OpsERA!  Your DevSecOps Solution.</div>
                <div className="h4 text-muted mb-5">Free Trail Landing Page: Please add the customized "Tab" design like the samples provided above the header text of this compontent.  The three options will be: Welcome, Platform, Pipeline and Analytics.  .</div>

                <div className="row mx-n2 mt-3" style={{ minWidth:"1020px" }}>
                  <div className="col-md px-2 landing-content-module">
                    <img alt="OpsERA"
                      src="/img/platform.png"
                      width="195"
                      height="225"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="col-md px-2 landing-content-module">
                    <img alt="OpsERA"
                      src="/img/pipeline.png"
                      width="195"
                      height="225"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div className="col-md px-2 landing-content-module2">
                    <img alt="OpsERA"
                      src="/img/analytics.png"
                      width="195"
                      height="225"
                      className="d-inline-block align-top"
                    />
                  </div>

                </div>
                <div className="row mx-n2 mt-4" style={{ minWidth:"1020px" }}>
                  <div className="col-md px-2 landing-content-module">
                    <div className="h5">Platform</div>
                    <div className="text-muted">TODO: this will link to a new UI componetnt that will have some text and links to a video.  Please stub out both and link to a placeholder video until we determine how that's going to work.

                    </div>
                  </div>
                  <div className="col-md px-2 landing-content-module">
                    <div className="h5">Pipeline</div>
                    <div className="text-muted">TODO: This page will need several content blocks.  At the top will be text describing what pipelines are.  Then a "get started" button (a big one) that takes users
                                        directly to the Pipeline Catalogs page, so please add that navigation.  </div>
                  </div>
                  <div className="col-md px-2 landing-content-module">
                    <div className="h5">Analytics</div>
                    <div className="text-muted">TODO: just wire up a new content component with some wording (Ip Sum) and put some chart imges on there and then add a "content module" that exaplains that Analytics
                                        demos are available with the customer's realtime data.  This requires a setup, so have a button that says "request demo" and for now the button doesn't do anything but after you click it, let the button
                                        disable and then display a message saying "real time demo request has been sent, you will be contacted by OpsERA".</div>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
          <Row>
            <Col xl="12" className="pt-4"><hr style={{ width:"1020px", textAlign: "left", marginLeft: "0" }} /></Col>
          </Row>
          <Row>
            <Col xl="12">
                        At this time OpsERA's solution is available for users through invitation only.
                        You will be contacted by OpsERA in order to complete your onboarding process.
            </Col>
          </Row>

          <Row>
            <Col xl="12" className="pt-3">
              <div className="h5">Need help?</div>
              <div className="medium-blue h6 mt-1">Send an email to support@opsera.io</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
  // }

}

export default FreeTrialLandingWelcome;