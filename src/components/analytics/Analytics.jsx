import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import ConfigurationsForm from "./configurationsForm";
import { ListGroup } from "react-bootstrap";
import SummaryChartsView from "./views/pipeline/buildView_developer";
import ReliabilityMetricsCharts from "./views/reliability/ReliabilityMetricsView";
import CodeCoverageMetricsView from "./views/sonarCodeCoverageView";
import "./analytics.css";
import "./charts/charts.css";
import DeploymentFrequencyLineChart from "./charts/deploymentFrequencyLineChart.jsx";
import JiraIssuesCreatedByDateLineChart from "./charts/jiraIssuesCreatedByDateLineChart.jsx";



function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  const [selection, setSelection] = useState("pipeline");
  const [previewRole, setPreviewRole] = useState(false);
  
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
    setLoadingProfile(true);
    const { getAccessToken, getIsPreviewRole } = contextType;

    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole); 
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);     
    }

    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";   
    setToken(accessToken);
    try {
      const profile = await axiosApiService(accessToken).get(apiUrl);      
      console.log("Profile: ", profile);
      setData(profile && profile.data.profile[0]);
      console.log(profile && profile.data.profile[0]);

      if (typeof(data.profile) === "object" && data.profile.length === 0) {
        setErrors("Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed.");
      }

      setLoadingProfile(false);
    }
    catch (err) {
      console.log(err.message);
      setLoadingProfile(false);
      setErrors(err.message);
    }
  }

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);
  };

  return (
    <>
      {loadingProfile ? <LoadingDialog size="lg" /> : null }
      {error ? <ErrorDialog error={error} /> : null}

      <div className="mt-3">
        <div className="max-content-width">
          <h4>Analytics</h4>
          <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
         logging, reports and configurations around the OpsERA Analytics Platform or search your 
        currently configured logs repositories below.</p>
        </div>
        <div className="p-2 mt-1 max-content-width mb-4">
          <ConfigurationsForm settings={data} token={token} />
        </div>

        { previewRole ?  //display work for new (v2) design
          <>
            <div className="p-2">
             
              <div className="mt-3">
                <ListGroup horizontal>
                  <ListGroup.Item className={"pointer " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")}>Pipeline</ListGroup.Item>
                  <ListGroup.Item className={"pointer " + (selection === "security" ? "active" : "")} onClick={handleTabClick("security")}>Security</ListGroup.Item>
                  <ListGroup.Item className={"pointer " + (selection === "software_development" ? "active" : "")} onClick={handleTabClick("software_development")}>Software Development</ListGroup.Item>
                  <ListGroup.Item className={"pointer " + (selection === "software_testing" ? "active" : "")} onClick={handleTabClick("software_testing")}>Software Testing</ListGroup.Item>
                  <ListGroup.Item className={"pointer " + (selection === "service_operation" ? "active" : "")} onClick={handleTabClick("service_operation")}>Service Operation</ListGroup.Item>                
                </ListGroup>
              </div>

              <div className="mt-3">
                <ChartView token={token} selection={selection} persona={null} />
              </div>

            </div>
          </> : null }

      </div>
    </>
  );
}


function ChartView({ selection, persona }) {
  useEffect(() => {
  }, [selection, persona]);

  if (selection) {
    switch (selection) {
    case "pipeline":
      return (
        <>
          <div className="m-2">
            <SummaryChartsView />
          </div>          
        </>);
          
    
    case "security":
      return (
        <>
          <div className="m-2">
            <ReliabilityMetricsCharts />
          </div>          
        </>);
        
    case "software_development":
      return (
        <>

          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <DeploymentFrequencyLineChart persona={persona}/>
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JiraIssuesCreatedByDateLineChart persona={persona} />
            </div>
          </div>

          
        </>);
        
    case "software_testing":
      return (
        <>
          <div className="m-2">
            <CodeCoverageMetricsView />
          </div>
        </>);

    case "service_operation":
      return (
        <>
          {/* Wire-up each chart component here, stacking them on top of each other.  Please wrap each individual chart in their own div with "m-2" class providing some margin around it */}
          <div>NO CHARTS AVAILABLE YET</div>  
        </>);

    default:
      return null; 
    }
  }
  
}

ChartView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string
};


export default Analytics;
