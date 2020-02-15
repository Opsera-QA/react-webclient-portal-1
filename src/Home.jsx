import React, { Component } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Row, Col, Button, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import LoadingDialog from "./components/common/loading";
import BuildCounts from "./components/dashboard/buildCounts";
import DemoLineChart from "./components/analytics/charts/demoLineChart";
import DemoBarChart from "./components/analytics/charts/demoBarChart";

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

  handleTabClick = param => e => {
    // param is the argument you passed to the function
    // e is the event object that returned
    e.preventDefault();
    
    console.log("Nav To: ", param);
    let path = `/${param}`;
    // eslint-disable-next-line react/prop-types
    //this.props.history.push(path);
  };

  render() {
    const { authenticated, userInfo } = this.context;
    
    return (
      <div className="mb-3 max-charting-width">
        { authenticated &&
          <div className="mt-2 mb-3">
            {/* <h3>Welcome back, {userInfo ? userInfo.name : "Unknown User Name"}!</h3> */}
            
            <div className="max-content-width mt-3 mb-4">
              <h4>My Dashboard</h4>
              <p>OpsERA offers the best, easy to use solutions for deploying, monitoring and managing your entire automation and workflow 
                pipelines, enabling organizations to build optimized and efficient DevOps based projects.</p>               
            </div>
            
            {/*     <div className="mt-3 mb-3">
              <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("platform")}>Pipeline</Button>
              <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("pipeline")}>SecOps</Button>
              <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("analytics")}>Logs</Button>
              <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("analytics")}>Tools</Button>
            </div> 
            */}
            <ul className="nav nav-pills ml-2 mb-2">
              <li className="nav-item">
                <a className="nav-link active" onClick={this.handleTabClick("platform")} href="#">Pipeline</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={this.handleTabClick("platform")} href="#">SecOps</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={this.handleTabClick("platform")} href="#">Logs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" onClick={this.handleTabClick("platform")} href="#">Tools</a>
              </li>
            </ul>
            
            <div className="d-flex">
              <div className="p-2" style={{ minWidth: "140px" }}>
                <BuildCounts />
              </div>
              <div className="p-2 flex-grow-1">
                <div className="chart mb-3" style={{ height: "300px" }}>
                  <DemoLineChart />
                </div>
                <div className="chart" style={{ height: "300px" }}>
                  <DemoBarChart />
                </div>
              </div>
            </div>

            {/* 
            <Row className="mt-4">
              <Col sm="3">
                <BuildCounts />
              </Col>
              <Col className="chart m-1" style={{ height: "400px" }}>
                <DemoLineChart />
              </Col>
            </Row>
             */}
            



          </div>
        }
        
        {typeof(authenticated) === "object" && !authenticated && <LoadingDialog />}
        
        {typeof(authenticated) === "boolean" && authenticated === false && 
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
                    <Button variant="success" className="btn-lg w-100 mb-3" onClick={this.gotoSignUp}>Sign Up</Button>
                  </div>
                  <div className="col-md px-2">
                    <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
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
            <Col className="text-center" xl="3"><img src="/img/opsera_logo_large.png" width="325" alt="" className="d-none d-xl-block text-center" /></Col>
          </Row>
        </div>}
      </div>
    );
  }
}

export default withRouter(Home);
