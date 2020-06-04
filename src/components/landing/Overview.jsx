//landing page after user signs in
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function OverviewLanding() {
  const contextType = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  useEffect(() => {    
    getRoles();
  }, []);

  const getRoles = async () => {
    const { getUserInfo } = contextType; 
    const user = await getUserInfo();
    
    setUserInfo(user);    
  };

  const loadPlatforms = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/platform");
  };

  const loadPipelines = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/workflow");
  };

  const loadAnalytics = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/analytics");
  };

  const loadDashboards = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/dashboard");
  };

  
  return (
    <>
      <div className="mt-3 ml-5">
        <Row>
          <Col xl="12">
            <div style={{ maxWidth: "1025px" }}>
              <div className="h5 mb-3">Welcome back {userInfo && userInfo.name ? userInfo.name : null}!</div>
              <div className="h4 text-muted mb-5">Get started with Opsera</div>
              
              <div className="row mx-n2 mt-4" style={{ minWidth:"1020px" }}>
                <div className="col-md px-2 landing-content-module">
                  <img alt="OpsERA"
                    src="/img/platform.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top pointer"
                    onClick= {() => { loadPlatforms(); }}
                  />
                </div>
                <div className="col-md px-2 landing-content-module">
                  <img alt="OpsERA"
                    src="/img/pipeline.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top pointer"
                    onClick= {() => { loadPipelines(); }}
                  />
                </div>
                <div className="col-md px-2 landing-content-module">
                  <img alt="OpsERA"
                    src="/img/analytics.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top pointer"
                    onClick= {() => { loadAnalytics(); }}
                  />
                </div>
                <div className="col-md px- landing-content-module2">
                  <img alt="OpsERA"
                    src="/img/dashboard.png"
                    width="195"
                    height="225"
                    className="d-inline-block align-top pointer"
                    onClick= {() => { loadDashboards(); }}
                  />
                </div>
              </div>
              <div className="row mx-n2 mt-4" style={{ minWidth:"1020px" }}>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Platform</div>
                  <div className="text-muted">Spin up a variety of tools through OpsERA.</div>
                </div>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Pipeline</div>
                  <div className="text-muted">Orchestrate workflows across various technologies and platforms.</div>
                </div>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Analytics</div>
                  <div className="text-muted">Get real time observability across your various pipelines.</div>
                </div>
                <div className="col-md px-2 landing-content-module">
                  <div className="h5">Dashboard</div>
                  <div className="text-muted">Stay current on exactly what you need to know.</div>
                </div>
              </div>
            </div>
          </Col>          
        </Row>
        <Row>
          <Col xl="12" className="pt-5"><hr style={{ width:"1020px", textAlign: "left", marginLeft: "0" }} /></Col>
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

export default OverviewLanding;