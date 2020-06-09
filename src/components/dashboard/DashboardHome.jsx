import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../../components/common/error";
import DropdownList from "react-widgets/lib/DropdownList";
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
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { DefinedRange } from "react-date-range";
import { Button, Alert, Overlay, Popover, Row, Col } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const PERSONAS = [ { value: "developer", label: "Developer" }, { value: "manager", label: "Manager" }, { value: "executive", label: "Executive" }];
const DATELABELS = [ { value: {
  start: "now-1h",
  end: "now"
}, label : "Last 1 Hour" }, { value: {
  start: "now-6h",
  end: "now"
}, label : "Last 6 Hours" }, { value: {
  start: "now-1d",
  end: "now"
}, label : "Last 24 Hours" }, { value: {
  start: "now-7d",
  end: "now"
}, label : "Last Week" }, { value: {
  start: "now-31d",
  end: "now"
}, label : "Last Month" }, { value: {
  start: "now-90d",
  end: "now"
}, label : "Last 3 Months" }, ];


function DashboardHome() {
  const contextType = useContext(AuthContext);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [enabledOn, setEnabledOn] = useState(true);
  const [date, setDate] = useState({
    start: "now-90d",
    end: "now",
    key: "selection"  
  });

  
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
    setPersona([selectedOption.selecton]);
  };


  const handleDateChange = (e) => {
    setDate(e.value);
  };

 
  return (
    <div className="mb-3 max-charting-width">
      { loading ? <LoadingDialog size="lg" /> : null}
      { !loading ?
        <>
          <div className="mt-2 mb-3">
        
            <div className="max-content-width mb-4">
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
                  <Col sm={2}>
                    <DropdownList
                      data={DATELABELS} 
                      className="max-content-width"
                      valueField='value'
                      textField='label'
                      defaultValue={date ?  DATELABELS.find(o => o.value.start === date.start && o.value.end === date.end) : DATELABELS[5]}
                      onChange={handleDateChange}             
                    />
                  </Col>
                  <Col sm={2}>    
                    <DropdownList
                      data={PERSONAS} 
                      className="basic-single mr-2"
                      valueField='value'
                      textField='label'
                      defaultValue={persona ?  PERSONAS.find(o => o.value === persona) : PERSONAS[0]}
                      onChange={handleSelectPersonaChange}             
                    />
                  </Col>
                </Row>
            
                <DashboardView selection={selection} persona={persona} date={date}/>
              </>
            }
            

          </div>
        </> : null}
    </div>
  );
  
}

function DashboardView({ selection, persona, date }) {
  useEffect(() => {
    console.log("CHANGE HAPPENED");
  }, [selection, persona, date.start]);
  console.log(date.start);

  if (selection) {
    switch (selection) {
    case "logs":
      return <LogsDashboard persona={persona} />;
    case "pipeline":
      return <PipelineDashboard_v2 persona={persona} date={date} />;
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
  persona: PropTypes.string, 
  date: PropTypes.object
};

export default DashboardHome;
