import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { Row, Col, Button, Card } from "react-bootstrap";
import { ApiService } from "./api/apiService";
import Select from "react-select";
import LoadingDialog from "./components/common/loading";
import ErrorDialog from "./components/common/error";
import PipelineDashboard from "./components/dashboard/Pipeline";
import SecOpsDashboard from "./components/dashboard/SecOps";
import LogsDashboard from "./components/dashboard/Logs";
import ToolsDashboard from "./components/dashboard/Tools";

const PERSONAS = [ { value: "0", label: "Developer" }, { value: "1", label: "Security" }, { value: "2", label: "Operations" }, { value: "3", label: "VP of Engineering" }];

function Home() {
  const contextType = useContext(AuthContext);
  const { authenticated } = contextType;
  const history = useHistory();

  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    
    apiCall.get()
      .then(res => {
        setData(res.data[0]);
        setPersona(res.data[0].defaultPersona);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
    console.log("call'n the number");
  }, []);


  const login = () => {
    const { loginUserContext } = contextType;
    loginUserContext();
  };

  const gotoSignUp = () => {
    history.push("/signup");
  };

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);
  };

  const handleSelectPersonaChange = (selectedOption) => {
    setPersona(selectedOption.value);
  };

  if (loading) {
    return (<LoadingDialog size="lg" />);
  } else if (typeof(authenticated) === "boolean" && authenticated === false) {
    return (
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
          <Col className="text-center" xl="3"><img src="/img/opsera_logo_large.png" width="325" alt="" className="d-none d-xl-block text-center" /></Col>
        </Row>
      </div>
    );
  } 
  else if (authenticated) {
    return (
      <div className="mb-3 max-charting-width">
        
        <div className="mt-2 mb-3">
          { hasError && <ErrorDialog error={hasError} /> }

          <div className="max-content-width mt-3 mb-4">
            <h4>My Dashboard</h4>
            <p>OpsERA offers the best, easy to use solutions for deploying, monitoring and managing your entire automation and workflow 
                pipelines, enabling organizations to build optimized and efficient DevOps based projects.</p>               
          </div>
           
          <Row>
            <Col sm={8}>
              <ul className="nav nav-pills ml-2 mb-2">
                <li className="nav-item">
                  <a className={"nav-link " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (selection === "secops" ? "active" : "")} onClick={handleTabClick("secops")} href="#">SecOps</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (selection === "logs" ? "active" : "")} onClick={handleTabClick("logs")} href="#">Logs</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link disabled " + (selection === "tools" ? "active" : "")} onClick={handleTabClick("tools")} href="#">Tools</a>
                </li>
              </ul></Col>
            <Col sm={4}>
              <Select
                className="basic-single mr-2"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                classNamePrefix="select"
                defaultValue={persona ? PERSONAS[parseInt(persona)] : PERSONAS[0]}
                isDisabled={false}
                isClearable={false}
                isSearchable={true}
                name="PERSONA-SELECT"
                options={PERSONAS}
                onChange={handleSelectPersonaChange}
              />
            </Col>
          </Row>
            
          {(() => {
            switch (selection) {
            case "pipeline":
              return <PipelineDashboard persona={persona} />;
            case "secops":
              return <SecOpsDashboard persona={persona} />;
            case "logs":
              return <LogsDashboard persona={persona} />;
            case "tools":
              return <ToolsDashboard persona={persona} />;
            default:
              return null; 
            }
          })()}
        </div>
      </div>
    );
  } else {
    return (<LoadingDialog size="lg" />);
  }
}

export default Home;
