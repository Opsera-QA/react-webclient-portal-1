import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { axiosApiService } from "../../api/apiService";
import Select from "react-select";
import { Row, Col, Alert } from "react-bootstrap";
import ErrorDialog from "../../components/common/error";
// import PipelineDashboard from "../../components/dashboard/Pipeline";
// import SecOpsDashboard from "../../components/dashboard/SecOps";
// import TestingDashboard from "../../components/dashboard/Testing";
import LogsDashboard from "../../components/dashboard/Logs";
import LoadingDialog from "../../components/common/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";

import PipelineDashboard_v2 from "../../components/dashboard/v2/Pipeline";
import SecOpsDashboard_v2 from "../../components/dashboard/v2/SecOps";
import QualityDashboard from "../../components/dashboard/v2/Quality";
import OperationsDashboard from "../../components/dashboard/v2/Operations";
import PlanningDashboard from "../../components/dashboard/v2/Planning";

const PERSONAS = [ { value: "developer", label: "Developer" }, { value: "manager", label: "Manager" }, { value: "executive", label: "Executive" }];

function DashboardHome() {
  const contextType = useContext(AuthContext);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [enabledOn, setEnabledOn] = useState(true);
  //const [previewRole, setPreviewRole] = useState(false);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
        
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);


  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;  //getIsPreviewRole
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";   

    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    /* const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole); 
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
      setSelection("pipeline_v2");
    } */

    try {
      const result = await axiosApiService(accessToken).get(apiUrl);     
      setData(result.data);
      let dataObject = result.data && result.data.profile.length > 0 ? result.data.profile[0] : {};
      let persona = dataObject.defaultPersona ? (dataObject.defaultPersona.length > 0) ? dataObject.defaultPersona : "developer" : "developer";
      
      setIsEnabled(dataObject.active !== undefined ? dataObject.active : false);
      setEnabledOn((dataObject.enabledToolsOn && dataObject.enabledToolsOn.length !== 0) ? true : false);

      setPersona(persona);    
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }



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
            { !isEnabled || !enabledOn || data.esSearchApi === null || data.vault !== 200 || data.esSearchApi.status !== 200 ? 
              <div style={{ height: "250px" }} className="max-content-module-width-50">
                <div className="row h-100">
                  <div className="col-sm-12 my-auto">
                    <Alert variant="warning">Your Analytics configurations are incomplete.  Please review the details below in order to determine what needs to be done.</Alert>
                    <div className="text-muted mt-4">
                      <div className="mb-3">In order to take advantage of the robust analytics dashboards offered by OpsERA, the following configurations are necessary:</div>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                    Your Analytics account must be enabled for yourself or your organization.
                          {enabledOn ? 
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
                    OpsERA Analytics authentication information must be secured and available.
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
                  
                  <Col sm={8}>
                    <ul className="nav nav-pills ml-2 mb-2">
                      <li className="nav-item">
                        <a className={"nav-link " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
                      </li>
                      <li className="nav-item">
                        <a className={"nav-link " + (selection === "planning" ? "active" : "")} onClick={handleTabClick("planning")} href="#">Planning</a>
                      </li>
                      <li className="nav-item">
                        <a className={"nav-link " + (selection === "secops_v2" ? "active" : "")} onClick={handleTabClick("secops_v2")} href="#">SecOps</a>
                      </li>
                      <li className="nav-item">
                        <a className={"nav-link " + (selection === "quality_v2" ? "active" : "")} onClick={handleTabClick("quality_v2")} href="#">Quality</a>
                      </li>
                      <li className="nav-item">
                        <a className={"nav-link " + (selection === "operations_v2" ? "active" : "")} onClick={handleTabClick("operations_v2")} href="#">Operations</a>
                      </li>                        
                    </ul>
                  </Col>
                  <Col sm={4}>                    
                    <Select
                      className="basic-single mr-2"
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      classNamePrefix="select"
                      defaultValue={persona ?  PERSONAS.find(o => o.value === persona) : PERSONAS[0]}
                      isClearable={false}
                      isSearchable={true}
                      name="PERSONA-SELECT"
                      options={PERSONAS}
                      onChange={handleSelectPersonaChange}
                    /> 
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
    case "logs":
      return <LogsDashboard persona={persona} />;
    case "pipeline":
      return <PipelineDashboard_v2 persona={persona} />;
    case "secops_v2":
      return <SecOpsDashboard_v2 persona={persona} />;
    case "quality_v2":
      return <QualityDashboard persona={persona} />;
    case "operations_v2":
      return <OperationsDashboard persona={persona} />;
    case "planning":
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
