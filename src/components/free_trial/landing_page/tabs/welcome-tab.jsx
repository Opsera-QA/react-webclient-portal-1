import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function FreeTrialLandingWelcome({ handleTabClick }) {

  return (
    <>
      <div className="tabbed-content-block w-75">
        <Row>
          <Col>
            <div className="content-card-3">
              <div className="content-block-header h5 pl-4 mb-0">Welcome to Opsera!  Your DevSecOps Solution.</div>
              <div className="content-block-body px-2 pt-2 pb-3">
                <div className="content-image float-left mr-3 mt-3">
                  <img alt="Opsera"
                       src="/img/logos/opsera_bird_infinity_171_126.png"
                       width="155"
                       height="114"
                  />
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
              <div className="content-block-header h5 pl-4 mb-0">Toolchain Automation</div>
              <div className="content-block-body px-2 pt-2 pb-3">
                <div>
                  <div className="float-left mt-1 ml-1 mr-3">
                    <img alt="platform"
                      src="/img/platform.png"
                      className="content-image"
                      onClick={handleTabClick("platform")}
                    />
                  </div>
                  <div className="text-muted mx-3 pt-3 pb-2">
                    Learn more about which platforms we support.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                    Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                    Vestibulum lacinia arcu eget nulla.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                  </div>
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
              <div className="content-block-header h5 pl-4 mb-0">Declarative Pipelines</div>
              <div className="content-block-body px-2 pt-2 pb-3">
                <div>
                  <div className="float-left mt-1 ml-1 mr-3">
                    <img alt="platform"
                      src="/img/pipeline.png"
                      className="content-image"
                      onClick={handleTabClick("pipeline")}
                    />
                  </div>
                  <div className="text-muted mx-3 pt-3 pb-2">
                    Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.
                    Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.
                    Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                    Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
                  </div>
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
              <div className="content-block-header h5 pl-4 mb-0">Insights & Analytics</div>
              <div className="content-block-body px-2 pt-2 pb-3">
                <div>
                  <div className="float-left mt-1 ml-1 mr-3">
                    <img alt="platform"
                      src="/img/analytics.png"
                      className="content-image"
                      onClick={handleTabClick("analytics")}
                    />
                  </div>
                  <div className="text-muted mx-3 pt-3 pb-2">
                    Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem,
                    at interdum magna augue eget diam. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                    Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.
                    Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel,
                    egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.
                    Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.
                  </div>
                </div>
              </div>
              <div className="content-block-footer" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mt-1"><hr/></Col>
        </Row>
      </div>
    </>
  );
}

FreeTrialLandingWelcome.propTypes = {
  handleTabClick: PropTypes.func,
};


export default FreeTrialLandingWelcome;