import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { Row, Col, Button, Card } from "react-bootstrap";
import LoadingDialog from "./components/common/loading";

function Home() {
  const contextType = useContext(AuthContext);
  const { authenticated, loading } = contextType;
  const history = useHistory();
  const [previewRole, setPreviewRole] = useState(false);

  useEffect(() => {    
    if (authenticated) {
      getRoles();      
    }
  }, [authenticated]);

  const login = () => {
    const { loginUserContext } = contextType;
    loginUserContext();
  };

  const gotoSignUp = () => {
    history.push("/signup");
  };

  const getRoles = async () => {
    //const { getUserInfo } = contextType; 
    //const user = await getUserInfo();
    //setPreviewRole(user.email.includes("@opsera.io")); 

    //if (user.email.includes("@opsera.io")) {
    history.push("/overview");
    //} else {
    //history.push("/inventory");
    //}    
  };


  return (
    <>
      {loading ? <LoadingDialog /> : 
        <>
         
          <div className="mt-3 ml-5 w-75">
            <Row>
              <Col xl="9">
                <div style={{ maxWidth: "725px" }}>
                  <h2 className="mb-3 bd-text-purple-bright">Welcome to OpsERA!</h2>
                  <div style={{ fontSize:"1.1rem" }}>
                      OpsERA’s vision is to enable and empower the developers, operations and release teams by giving the flexibility in selecting the various DevOps 
                      functional tools, build the pipeline with quality and security gates.
                  </div>
                  <div style={{ fontSize:"1.1rem" }} className="mt-3">OpsERA provides out of the box monitoring dashboard, giving an end to end visibility of DevOps landscape metrics 
                      via an intelligent dashboard to improve the Agility, Operational excellence and help them to track security and compliance metrics.</div>
              
                  <div className="row mx-n2 mt-4">
                    <div className="col-md px-2">
                      <Button variant="success" className="btn-lg w-100 mb-3" onClick={gotoSignUp}>Sign Up</Button>
                    </div>
                    <div className="col-md px-2">
                      <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={login}>Log In</Button>
                    </div>
                  </div>

                  <Card className="mt-4 mb-4">
                    <Card.Header>Key Features</Card.Header>
                    <Card.Body>
                      <p><b>Platform:</b> Install, manage and Orchestrate choice of your DevOps tools via a self-service portal in just a matter of Minutes</p>
                      <p><b>Pipeline:</b> Build and manage pipeline in less than minutes using best practices, standards and quality and security gates. Supports Multi-cloud, Multi-Language and Multi branch deployment.</p>
                      <p><b>Analytics:</b> Offers integrated Intelligent dashboard and analytics for the platform, pipeline and devsecops metrics</p>
                      <p><b>API connectors:</b> Offers out of the box API connectors to integrate with Source code repositories, bug tracking, ITSM and collaboration tools</p>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col className="text-center" xl="3">{/* <img src="/img/opsera_logo_large.png" width="325" alt="" className="d-none d-xl-block text-center" /> */}</Col>
            </Row>
          </div>
          
        </>
      }
    </>
  );
  // } 

}

export default Home;
