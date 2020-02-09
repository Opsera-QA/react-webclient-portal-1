import React, { Component } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Row, Col, Button, Card } from "react-bootstrap";
//import { Link } from "react-router-dom";
//import FeaturesCards from "./components/about/features";
import LoadingDialog from "./components/common/loading";

class Home extends Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
  }

  async login() {
    const { loginUserContext } = this.context;
    loginUserContext();
  }

  gotoSignUp = () => {
    let path = "/signup";
    // eslint-disable-next-line react/prop-types
    this.props.history.push(path);
  }

  render() {
    const { authenticated, userInfo } = this.context;
    
    return (
      <div>
        { authenticated &&
          <div className="mt-3 max-content-width">
            <h2>Welcome back, {userInfo ? userInfo.name : "Unknown User Name"}!</h2>
            <p>
              You have successfully logged in!  Review the options below in order to get started.  
            </p>

            <Card className="mt-4">
              <Card.Header>Getting Started</Card.Header>
              <Card.Body>
                <Card.Title>OpsERA offers multiple ways to work with your DevOps solution.</Card.Title>
                <Card.Text>
              The OpsERA DevOps Product offers the best time to market solutions for all of your technology
                  automation and workflow needs enabling organizations to build optimized and efficient DevOps projects.  
                  We deliver solutions to automate build, deploy, security and testing with open source tools for your development team to
                  manage application upgrades effectively and in a secured way. We also provide pragmatic solutions for
                  various cloud-based products using open source frameworks and we ensure that enterprise policies are met.
                </Card.Text>
                {/* <Button variant="primary" onClick={() => this.gotoLink("inventory")}>Application Inventory</Button> */}
                <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("platform")}>Platforms</Button>
                <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("pipeline")}>Pipelines</Button>
                <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("analytics")}>Analytics</Button>
              </Card.Body>
            </Card>
          </div>
        }
        
        {typeof(authenticated) === "object" && !authenticated && <LoadingDialog />}
        
        {typeof(authenticated) === "boolean" && authenticated === false && 
        <div style={{ marginTop: 25 }}>
          <Row>
            <Col>
              <div>
                <h2 className="mb-3 bd-text-purple-bright">Welcome to OpsERA!</h2>
                <div style={{ fontSize:"1.1rem" }}>
                  OpsERA’s vision is to enable and empower the developers, operations and release teams by giving the flexibility in selecting the various DevOps 
                  functional tools, build the pipeline with quality and security gates.
                </div>
                <div style={{ fontSize:"1.1rem" }} className="mt-3">OpsERA provides out of the box monitoring dashboard, giving an end to end visibility of DevOps landscape metrics 
                via an intelligent dashboard to improve the Agility, Operational excellence and help them to track security and compliance metrics.</div>
                
                <Card className="mt-4 mb-4">
                  <Card.Header>Key Features</Card.Header>
                  <Card.Body>
                    <p><b>Platform:</b> Install, manage and Orchestrate choice of your DevOps tools via a self-service portal in just a matter of Minutes</p>
                    <p><b>Pipeline:</b> Build and manage pipeline in less than minutes using best practices, standards and quality and security gates. Supports Multi-cloud, Multi-Language and Multi branch deployment.</p>
                    <p><b>Analytics:</b> Offers integrated Intelligent dashboard and analytics for the platform, pipeline and devsecops metrics</p>
                    <p><b>API connectors:</b> Offers out of the box API connectors to integrate with Source code repositories, bug tracking, ITSM and collaboration tools</p>
                  </Card.Body>
                </Card>
                
                <div className="row mx-n2">
                  <div className="col-md px-2">
                    <Button variant="success" className="btn-lg w-100 mb-3" onClick={this.gotoSignUp}>Sign Up</Button>
                  </div>
                  <div className="col-md px-2">
                    <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="d-none d-xl-block text-center" md="auto"><img src="/img/opsera_logo_large.png" width="325" alt="" /></Col>
          </Row>
        </div>}
      </div>
    );
  }
}

export default Home;
