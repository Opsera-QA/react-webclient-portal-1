import React from "react";
import {Row, Col, Button} from "react-bootstrap";

import "../../freeTrial.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

function FreeTrialLandingPipeline() {
  const history = useHistory();

  return (
    <>
      <div className="tabbed-content-block">
        <div className="mt-3 ml-5 w-75">
          <Row>
            <Col>
              <div>
                <div className="h4 mb-3">What are Pipelines?</div>
                <div className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                  Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                  Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                  Vestibulum lacinia arcu eget nulla.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </div>
                <div className="mt-4">
                  <Button size="lg" className="pull-right mr-2" variant="success" onClick= {() => {history.push("/workflow/catalog"); }} >
                    <FontAwesomeIcon className="mr-2" icon={faCheckCircle} fixedWidth style={{ cursor: "pointer" }} />Get Started Now!
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-1"><hr/></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div className="h4 mb-3 text-right">Pipelines Topic 2</div>
                <div className="text-muted">
                  Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.
                  Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.
                  Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
                  Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                  Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-4"><hr/></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div className="h4 mb-3">Pipelines Topic 3</div>
                <div className="text-muted">
                  Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem,
                  at interdum magna augue eget diam. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                  Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.
                  Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel,
                  egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.
                  Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-4"><hr/></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div className="h4 mb-3 text-right">Pipelines Topic 4</div>
                <div className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                  Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                  Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                  Vestibulum lacinia arcu eget nulla.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>

  );
  // }

}

export default FreeTrialLandingPipeline;