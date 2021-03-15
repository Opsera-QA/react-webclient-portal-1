// landing page after user registers

import React from "react";
import { Row, Col } from "react-bootstrap";

import "./landing.css";

function RegistrationLanding() {


  return (

    <>
      <div className="mt-3 ml-5 w-75">
        <Row>
          <Col xl="12">
            <div style={{ maxWidth: "1025px" }} className={"mt-3"}>
              <div className="h4 mb-3">Welcome to Opsera! Your DevSecOps Solution.</div>
              <div className="text-muted mb-5 mt-1" style={{ fontSize: "larger" }}>Your registration request has been
                processed successfully. You will
                receive an email from our Okta service in order to complete your account registration. After that is
                complete,
                an Opsera representative will contact you in order to finalize your new solution. If you have any
                questions,
                please do not hesitate to email us at support@opsera.io
              </div>

              <div className="row mx-n2 mt-3" style={{ minWidth: "1020px" }}>
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
              <div className="row mx-n2 mt-4" style={{ minWidth: "1020px" }}>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Toolchain Automation</div>
                  <div className="text-muted">You choose your tools, we take care of the rest. Put together the perfect CI/CD stack that fits your organization’s goals with zero vendor lock-in.
                  </div>
                </div>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Declarative Pipelines</div>
                  <div className="text-muted">Pipeline workflows follow a declarative model so you focus on what is required — not how it’s accomplished — including: software builds, security scans, unit testing, and deployments.</div>
                </div>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Analytics and Intelligence</div>
                  <div className="text-muted">Comprehensive software delivery analytics across your CI/CD process in a unified view — including Lead Time, Change Failure Rate, Deployment Frequency, and Time to Restore.</div>
                </div>
              </div>


            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="12" className="pt-4">
            <hr style={{ width: "1020px", textAlign: "left", marginLeft: "0" }}/>
          </Col>
        </Row>

        <Row>
          <Col xl="12" className="pt-3">
            <div className="h5">Need help?</div>
            <div className="text-muted h6 mt-1">Send an email to support@opsera.io</div>
          </Col>
        </Row>
      </div>

    </>

  );
  // } 

}

export default RegistrationLanding;
