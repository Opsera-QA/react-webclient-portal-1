import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import Select from "react-select";
import { Row, Col, Alert } from "react-bootstrap";
import ErrorDialog from "../../components/common/error";
import PipelineDashboard from "../../components/dashboard/Pipeline";
import SecOpsDashboard from "../../components/dashboard/SecOps";
import TestingDashboard from "../../components/dashboard/Testing";
import LogsDashboard from "../../components/dashboard/Logs";
import LoadingDialog from "../../components/common/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";

import PipelineDashboard_v2 from "../../components/dashboard/v2/Pipeline";
import SecOpsDashboard_v2 from "../../components/dashboard/v2/SecOps";
import QualityDashboard from "../../components/dashboard/v2/Quality";
import TestingDashboard_v2 from "../../components/dashboard/v2/Testing";
import OperationsDashboard from "../../components/dashboard/v2/Operations";
import PlanningDashboard from "../../components/dashboard/v2/Planning";

const PERSONAS = [ { value: "0", label: "Developer" }, { value: "1", label: "Security" }, { value: "2", label: "Operations" }, { value: "3", label: "VP of Engineering" }];

function DashboardHome() {
  const contextType = useContext(AuthContext);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  const [loading, setLoading] = useState(false);
  const [previewRole, setPreviewRole] = useState(false);
  

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken, getIsPreviewRole } = contextType;
    
    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole); 
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
      setSelection("pipeline_v2");
    }
    

    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    const result = await apiCall.get()
      .catch(function (error) {
        setErrors(error.toJSON());
      });
      
    setLoading(false);
    if (typeof(result) !== "undefined") {
      setData(result.data);
      if (result.data !== undefined && result.data.profile.length > 0) {
        setPersona(result.data.profile[0].defaultPersona);      
      }
    }
    
  };

  useEffect( () => {
    getApiData();
  }, []);

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);
  };

  const handleSelectPersonaChange = (selectedOption) => {
    setPersona(selectedOption.value);
  };

 
  return (
    <div className="mb-3 max-charting-width">
      { loading ? <LoadingDialog size="lg" /> : null}
      { !loading ?
        <>
          <div className="mt-2 mb-3">
        
            <div className="max-content-width mt-3 mb-4">
              <h4>My Dashboard</h4>
              <p>OpsERA offers the best, easy to use solutions for deploying, monitoring and managing your entire automation and workflow 
                pipelines, enabling organizations to build optimized and efficient DevOps based projects.</p>               
            </div>

            { hasError && <ErrorDialog error={hasError} className="max-content-width mt-4 mb-4" /> }
            {console.log(data)}
            { data.profile === undefined || data.profile.length === 0 || data.esSearchApi === null || data.vault !== 200 || data.esSearchApi.status !== 200 ? 
              <div style={{ height: "250px" }} className="max-content-module-width-50">
                <div className="row h-100">
                  <div className="col-sm-12 my-auto">
                    <Alert variant="info">Your Analytics Profile has not been enabled for this account.  Please update your <Link to='/profile'>Analytics 
                Profile Settings</Link> on the left menu and enable your settings in order to use the Dashboards.</Alert>
                    <div className="text-muted mt-4">
                      <div className="mb-3">In order to take advantage of the robust analytics dashboards offered by OpsERA, the following configurations are necessary:</div>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                    Analytics must be enabled for your profile.
                          {(typeof data.profile === "object" && data.profile.length > 0 ) ? 
                            <span className="badge badge-success badge-pill"><FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth /></span>  :
                            <span className="badge badge-warning badge-pill"><FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth /></span> }
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                    An OpsERA Analytics instance must be spun up and configured with your pipeline tools.
                          {data.esSearchApi === undefined || data.esSearchApi === null || data.esSearchApi.status !== 200 ? 
                            <span className="badge badge-warning badge-pill"><FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth /></span> :
                            <span className="badge badge-success badge-pill"><FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth /></span> }
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                    OpsERA Analytics authentication information must be secured in Vault.
                          {data.vault === undefined || data.vault !== 200 ? 
                            <span className="badge badge-warning badge-pill"><FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth /></span> :
                            <span className="badge badge-success badge-pill"><FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth /></span> }
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                      Pipeline activity must have occurred in order for the system to collect data for display.
                          <span className="badge badge-warning badge-pill"><FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth /></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> :
              <>
                <Row>
                  { previewRole ?  //display work for new (v2) design
                    <Col sm={8}>
                      <ul className="nav nav-pills ml-2 mb-2">
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "pipeline_v2" ? "active" : "")} onClick={handleTabClick("pipeline_v2")} href="#">Pipeline</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "secops_v2" ? "active" : "")} onClick={handleTabClick("secops_v2")} href="#">SecOps</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "quality_v2" ? "active" : "")} onClick={handleTabClick("quality_v2")} href="#">Quality</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "testing_v2" ? "active" : "")} onClick={handleTabClick("testing_v2")} href="#">Testing</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "operations_v2" ? "active" : "")} onClick={handleTabClick("operations_v2")} href="#">Operations</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "planning_v2" ? "active" : "")} onClick={handleTabClick("planning_v2")} href="#">Planning</a>
                        </li>
                      </ul>
                    </Col> :
                    <Col sm={8}>
                      <ul className="nav nav-pills ml-2 mb-2">
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "secops" ? "active" : "")} onClick={handleTabClick("secops")} href="#">SecOps</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "testing" ? "active" : "")} onClick={handleTabClick("testing")} href="#">Testing</a>
                        </li>
                        <li className="nav-item">
                          <a className={"nav-link " + (selection === "logs" ? "active" : "")} onClick={handleTabClick("logs")} href="#">Logs</a>
                        </li>                        
                      </ul>
                    </Col>
                  }
                  <Col sm={4}>
                    { previewRole ?  //display work for new (v2) design
                      <Select
                        className="basic-single mr-2"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        classNamePrefix="select"
                        defaultValue={persona ? PERSONAS[parseInt(persona)] : PERSONAS[0]}
                        isDisabled={true}
                        isClearable={false}
                        isSearchable={true}
                        name="PERSONA-SELECT"
                        options={PERSONAS}
                        onChange={handleSelectPersonaChange}
                      /> : null }
                  </Col>
                </Row>
            
                <DashboardView selection={selection} persona={persona} />
              </>
            }
            

          </div>
        </> : null}
    </div>
  );
  
}

function DashboardView({ selection, persona }) {
  useEffect(() => {
  }, [selection, persona]);

  if (selection) {
    switch (selection) {
    case "pipeline":
      return <PipelineDashboard persona={persona} />;
    case "secops":
      return <SecOpsDashboard persona={persona} />;
    case "testing":
      return <TestingDashboard persona={persona} />;
    case "logs":
      return <LogsDashboard persona={persona} />;
    case "pipeline_v2":
      return <PipelineDashboard_v2 persona={persona} />;
    case "secops_v2":
      return <SecOpsDashboard_v2 persona={persona} />;
    case "quality_v2":
      return <QualityDashboard persona={persona} />;
    case "testing_v2":
      return <TestingDashboard_v2 persona={persona} />;
    case "operations_v2":
      return <OperationsDashboard persona={persona} />;
    case "planning_v2":
      return <PlanningDashboard persona={persona} />;
    default:
      return null; 
    }
  }
  
}

DashboardView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string
};

export default DashboardHome;
