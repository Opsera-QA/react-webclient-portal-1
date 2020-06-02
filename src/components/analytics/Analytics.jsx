import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import ConfigurationsForm from "./configurationsForm";
import { ListGroup, Alert } from "react-bootstrap";
import SummaryChartsView from "./views/pipeline/buildView_developer";
import ReliabilityMetricsCharts from "./views/reliability/ReliabilityMetricsView";
import CodeCoverageMetricsView from "./views/sonarCodeCoverageView";
import "./analytics.css";
import "./charts/charts.css";
import DeploymentFrequencyLineChart from "./charts/deploymentFrequencyLineChart.jsx";
import JiraIssuesCreatedByDateLineChart from "./charts/jiraIssuesCreatedByDateLineChart.jsx";
import DeploymentsStackedBarChart from "./charts/DeploymentsStackedBarChart";
import CircleChart from "./charts/CircleChart";
import JiraHealthBySprintBarChart from "./charts/jiraHealthBySprintBarChart";
import SonarSecurityLineChart from "./charts/sonarSecurityLineChart";
import JMeterHitsLineChart from "./charts/jmeterHitsLineChart";
import JMeterErrorsLineChart from "./charts/jmeterErrorsLineChart";
import JMeterThroughputLineChart from "./charts/jmeterThroughputLineChart";
import JMeterResponseTimeLineChart from "./charts/jmeterResponseTimeLineChart";
import JMeterResultsTable from "./metrics/jmeterResultsTable";
import GitlabPlanCodeView from "./views/GitlabPlanCodeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";

function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  const [selection, setSelection] = useState("pipeline");
  const [profile, setProfile] = useState({});
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
    setLoadingProfile(true);
    const { getAccessToken } = contextType;  //getIsPreviewRole

    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    /* const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole);
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
    } */

    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";
    setToken(accessToken);
    try {
      const profile = await axiosApiService(accessToken).get(apiUrl);
      console.log("Profile: ", profile.data);
      setProfile(profile.data);
      setIsEnabled(profile.data.profile !== undefined && profile.data.profile.length > 0  ? profile.data.profile[0].active : false);
      setEnabledOn(profile.data.profile !== undefined && profile.data.profile.length > 0 ? (profile.data.profile[0].enabledToolsOn && profile.data.profile[0].enabledToolsOn.length !== 0) ? true : false : false);


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

  if (loadingProfile) {
    return (
      <LoadingDialog size="lg" />
    );
  }
  else if (error) {
    return (
      <ErrorDialog error={error}/>
    );
  } else {
    return (
      <>
        {loadingProfile ? <LoadingDialog size="lg" /> : null }
        {error ? <ErrorDialog error={error} /> : null}
        { !isEnabled || !enabledOn || profile.esSearchApi === null || profile.vault !== 200 || profile.esSearchApi.status !== 200 ? 
          <div style={{ height: "250px" }} className="max-content-module-width-50">
            <div className="max-content-width">
              <h4>Analytics</h4>
              <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available
           logging, reports and configurations around the OpsERA Analytics Platform or search your
          currently configured logs repositories below.</p>
            </div>
            <div className="mt-1 max-content-width mb-4">
              <ConfigurationsForm settings={data} token={token} />
            </div>
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
                      {profile.esSearchApi === undefined || profile.esSearchApi === null || profile.esSearchApi.status !== 200 ? 
                        <span className="badge badge-warning badge-pill"><FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth /></span> :
                        <span className="badge badge-success badge-pill"><FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth /></span> }
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      OpsERA Analytics authentication information must be secured and available.
                      {profile.vault === undefined || profile.vault !== 200 ? 
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
            </div>
          </>
        }
      </>
    );
  }

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
            <ReliabilityMetricsCharts persona={persona} />
          </div>
          
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="vulnerabilities" />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="new_vulnerabilities" />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="code_smells" />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="new_technical_debt" />
            </div>
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
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <DeploymentsStackedBarChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <CircleChart persona={persona} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JiraHealthBySprintBarChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              {/* Self Contained Chart Component 4  */}
            </div>
          </div>
          {/* Commenting this out as part of phase 2 - will be pushed as part of phase 2 forward fixes */}
          {/* <GitlabPlanCodeView persona={persona} /> */}

        </>);

    case "software_testing":
      return (
        <>
          <div className="m-2">
            <CodeCoverageMetricsView />
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JMeterHitsLineChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JMeterErrorsLineChart persona={persona} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JMeterThroughputLineChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JMeterResponseTimeLineChart persona={persona} />
            </div>
          </div>
          <JMeterResultsTable />
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
