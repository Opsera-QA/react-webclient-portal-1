import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function FreeTrialLandingAnalytics() {
  const [demoRequested, setDemoRequested] = useState(false);
  const history = useHistory();

  return (
    <>
      <div className="tabbed-content-block w-75">
        <div>
          <Row>
            <Col>
              <div className="content-card-3">
                <div className="content-block-header h5 pl-4 mb-0">Insights</div>
                <div className="content-block-body px-2 pt-2 pb-1">
                  <div className="content-image float-left mr-3">
                    <div className="float-left mt-1 ml-1 mr-3">
                      <img alt="platform"
                        src="/img/analytics.png"
                        className="content-image"
                      />
                    </div>
                  </div>
                  <div className="text-muted mx-3 pt-3 pb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                    Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                    Vestibulum lacinia arcu eget nulla.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                  </div>
                </div>
                <div className="content-block-footer" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-1"><hr/></Col>
          </Row>
          <Row>
            <Col>
              <div className="content-card-1">
                <div className="content-block-header h5 pl-4 mb-0">Analytics Screenshots</div>
                <div className="content-block-body px-2 pt-2 pb-2">
                  <div>
                    <img alt="OpsERA"
                      src="/img/analytics/analytics1.png"
                      width="890"
                      className="d-inline-block align-top"
                    />
                  </div>
                  <div>
                    <img alt="OpsERA"
                      src="/img/analytics/analytics2.png"
                      width="890"
                      className="d-inline-block align-top"
                    />
                  </div>
                </div>
                <div className="content-block-footer" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-4"><hr/></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div className="h4 my-3 text-center">Request A Customized Analytics Demo</div>
                <div className="text-muted  text-center">
                  Analytics demos are available with your realtime data.
                </div>
                <div className="mt-4 text-center">
                  <Button disabled={demoRequested === true} size="lg" className="pull-right mr-2" variant="success" onClick= {() => {setDemoRequested(true); }} >
                    <IconBase className={"mr-2 pointer"} icon={faCheckCircle} />Request a demo today!
                  </Button>
                </div>
                {demoRequested && <div className="text-center mt-1">
                  Your realtime demo request has been sent. You will be contacted by Opsera.
                </div>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-4"><hr/></Col>
          </Row>
        </div>
      </div>
    </>

  );
  // }

}

export default FreeTrialLandingAnalytics;