import React, { Component } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeaturesCards from "./components/about/features";
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
          <div style={{ marginTop: 15 }}>
            <h2>Welcome back, {userInfo ? userInfo.name : "Unknown User Name"}!</h2>
            <p>
              You have successfully logged in!  Review the options below in order to get started.  
            </p>

            <FeaturesCards />
          </div>
        }
        
        {typeof(authenticated) === "object" && !authenticated && <LoadingDialog />}
        
        { typeof(authenticated) === "boolean" && authenticated === false && <div style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-md-12 col-lg-9 text-center text-md-left pr-md-3">
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

            <div className="d-none d-xl-inline col-3 mx-auto">
              <img src="/img/opsera_logo_large.png" width="325" alt="" />
            </div>
          </div>
        </div>
        }

      </div >
    );
  }
}

export default Home;
