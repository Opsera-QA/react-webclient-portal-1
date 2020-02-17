import React, { Component } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Row, Col, Button, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import LoadingDialog from "./components/common/loading";
import PipelineDashboard from "./components/dashboard/Pipeline";
import SecOpsDashboard from "./components/dashboard/SecOps";
import LogsDashboard from "./components/dashboard/Logs";
import ToolsDashboard from "./components/dashboard/Tools";

class Home extends Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
    this.state = {
      selection: "pipeline"
    };
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
    this.setState({
      selection: param
    });
  };

  render() {
    const { authenticated } = this.context;
    const { selection } = this.state;
    return (
      <div className="mb-3 max-charting-width">
        { authenticated &&
          <div className="mt-2 mb-3">
            
            <div className="max-content-width mt-3 mb-4">
              <h4>My Dashboard</h4>
              <p>OpsERA offers the best, easy to use solutions for deploying, monitoring and managing your entire automation and workflow 
                pipelines, enabling organizations to build optimized and efficient DevOps based projects.</p>               
            </div>
           
            <ul className="nav nav-pills ml-2 mb-2">
              <li className="nav-item">
                <a className={"nav-link " + (selection === "pipeline" ? "active" : "")} onClick={this.handleTabClick("pipeline")} href="#">Pipeline</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (selection === "secops" ? "active" : "")} onClick={this.handleTabClick("secops")} href="#">SecOps</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (selection === "logs" ? "active" : "")} onClick={this.handleTabClick("logs")} href="#">Logs</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link disabled " + (selection === "tools" ? "active" : "")} onClick={this.handleTabClick("tools")} href="#">Tools</a>
              </li>
            </ul>
            
            {(() => {
              switch (selection) {
              case "pipeline":
                return <PipelineDashboard />;
              case "secops":
                return <SecOpsDashboard />;
              case "logs":
                return <LogsDashboard />;
              case "tools":
                return <ToolsDashboard />;
              default:
                return null; //TODO: Wrie up some welcome thing in Features for this case
              }
            })()}

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
