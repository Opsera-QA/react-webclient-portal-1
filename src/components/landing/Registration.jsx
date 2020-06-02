// landing page after user registers

import React from "react";
import { Row, Col } from "react-bootstrap";

function RegistrationLanding() {
  
  
  return (
    
    <>
      <div className="mt-3 ml-5 w-75">
        <Row>
          <Col xl="12">
            <div style={{ maxWidth: "1025px" }}>
              <div className="h5 mb-3">Welcome to OpsERA!  Your DevSecOps Solution.</div>
              <div className="h4 text-muted mb-5">Your registration has been processed successfully.  You will be contacted shortly by an OpsERA representative to complete your onboarding process.</div>

              <div style={{ fontSize:"1.1rem" }}>At this time OpsERA's solution is available for users through invitation and working with an OpsERA representative to align with your goals. 
              You will be contacted by OpsERA in order to complete your onboarding process and walk you through how to best leverage the solution for your needs.  Below are the key offerings of the 
              OpsERA platform.
              </div>
              
              
              <div className="row mx-n2 mt-4">
                <div className="col-md px-2">
                  <img alt="OpsERA"
                    src="/img/platform.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top"
                  />
                </div>
                <div className="col-md px-2">
                  <img alt="OpsERA"
                    src="/img/pipeline.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top"
                  />
                </div>
                <div className="col-md px-2">
                  <img alt="OpsERA"
                    src="/img/analytics.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top"
                  />
                </div>
                <div className="col-md px-2">
                  <img alt="OpsERA"
                    src="/img/dashboard.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top"
                  />
                </div>
              </div>
              <div className="row mx-n2 mt-4">
                <div className="col-md px-2">
                  <div className="h5">Platform</div>
                  <div className="text-muted">Spin up a variety of tools through OpsERA.</div>
                </div>
                <div className="col-md px-2">
                  <div className="h5">Pipeline</div>
                  <div className="text-muted">Orchestrate workflows across various technologies and platforms.</div>
                </div>
                <div className="col-md px-2">
                  <div className="h5">Analytics</div>
                  <div className="text-muted">Get real time observability across your various pipelines.</div>
                </div>
                <div className="col-md px-2">
                  <div className="h5">Dashboard</div>
                  <div className="text-muted">Stay current on exactly what you need to know.</div>
                </div>
              </div>
            </div>
          </Col>          
        </Row>
        <Row>
          <Col xl="12" className="pt-5"><hr /></Col>
        </Row>  
        <Row>
          <Col xl="12" className="pt-2">
            <div className="h5">Need help?</div>
            <div className="medium-blue h6 mt-1">Send an email to support@opsera.io</div>
          </Col>
        </Row>
      </div>
          
    </>
    
  );
  // } 

}

export default RegistrationLanding;
