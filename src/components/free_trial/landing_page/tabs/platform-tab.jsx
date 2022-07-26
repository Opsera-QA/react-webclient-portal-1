import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function FreeTrialLandingPlatform() {
  const history = useHistory();

  return (
    <>
      <div className="tabbed-content-block w-75">
        <div>
          <Row>
            <Col>
              <div className="content-card-3">
                <div className="content-block-header h5 pl-4 mb-0">Toolchain Automation</div>
                <div className="content-block-body px-2 pt-2 pb-1">
                  <div className="content-image float-left mr-3">
                    <iframe src='https://www.youtube.com/embed/LFDrDnKPOTg'
                      frameBorder='0'
                      allow='autoplay; encrypted-media'
                      allowFullScreen
                      title='video'
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
                  <div className="mt-4 text-center">
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
                <div className="content-block-header text-right h5 pr-4 mb-0">Platforms Topic 2</div>
                <div className="content-block-body p-4">
                  <div className="text-muted">
                  Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.
                  Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.
                  Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
                  Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                  Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
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
                <div className="content-block-header text-left h5 pl-4 mb-0">Platforms Topic 3</div>
                <div className="content-block-body p-4">
                  <div className="text-muted">
                    Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem,
                    at interdum magna augue eget diam. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                    Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.
                    Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel,
                    egestas et, augue. Vestibulum tincidunt malesuada tellus.
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
              <div className="content-card-1">
                <div className="content-block-header text-right h5 pr-4 mb-0">Platforms Topic 4</div>
                <div className="content-block-body p-4">
                  <div className="text-muted">
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
            <Col className="pt-4"><hr/></Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default FreeTrialLandingPlatform;