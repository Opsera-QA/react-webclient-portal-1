import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/status_notifications/error";
import LoadingDialog from "../common/status_notifications/loading";
import ConfigurationsForm from "./configurationsForm";
import { ListGroup, Alert, Tooltip, OverlayTrigger, Col, Row } from "react-bootstrap";
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
// import GitlabPlanCodeView from "./views/GitlabPlanCodeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
// import GitlabMergeRequestsView from "./views/GitlabMergeRequestsView";
// import GitlabMergeRequestTimeTakenBarChart from "./charts/GitlabMergeRequestTimeTakenBarChart";
import SourceCodeView from "./views/SourceCode/SourceCodeView_developer";


const INDICES = ["jenkins", "opsera-pipeline-step-summary"];
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

function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [settingsData, setSettingsData] = useState({});
  const [index, setIndex] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  const [selection, setSelection] = useState("pipeline");
  const [profile, setProfile] = useState({});
  const [label, setLabel] = useState("Last 3 Months");
  const [date, setDate] = useState({
    start: "now-90d",
    end: "now",
    key: "selection"  
  });


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

  const handleDateChange = (e) => {
    setDate(e.value);
    setLabel(e.label.toString());
  };

  const ValueInput = ({ item }) => (
    <span>
      <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth/>
      {" " + DATELABELS.find(o => o.value.start === date.start && o.value.end === date.end).label.toString()}
    </span>
  );

  const handleCreate = (name) => {
    let item = {
      value: "test", 
      label: name
    };

    if (name.toLowerCase().includes("last")) {
      if (name.toLowerCase().includes("week") || name.toLowerCase().includes("weeks")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "w";
        item.value = {
          start: filter,
          end: "now"
        };
        DATELABELS.push(item);
        setDate(item.value);        
      } else if (name.toLowerCase().includes("days") || name.toLowerCase().includes("day")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "d";
        item.value = {
          start: filter,
          end: "now"
        };
        DATELABELS.push(item);
        setDate(item.value);        
      } else if (name.toLowerCase().includes("months") || name.toLowerCase().includes("month")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "M";
        item.value = {
          start: filter,
          end: "now"
        };
        DATELABELS.push(item);
        setDate(item.value);        
      } else if (name.toLowerCase().includes("year") || name.toLowerCase().includes("years")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "y";
        item.value = {
          start: filter,
          end: "now"
        };
        DATELABELS.push(item);
        setDate(item.value);        
      } else if (name.toLowerCase().includes("hour") || name.toLowerCase().includes("hours")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "h";
        item.value = {
          start: filter,
          end: "now"
        };
        DATELABELS.push(item);
        setDate(item.value);        
      }
    }
  };

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Select timeframe or manually enter in a "Last XX Days/Months/Years" format
      </Tooltip>
    );
  }


  async function fetchData() {
    setLoadingProfile(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";
    setToken(accessToken);
    try {
      const profileResponse = await axiosApiService(accessToken).get(apiUrl);
      setSettingsData(profileResponse.data);

      if (!Array.isArray(profileResponse.data.profile) || profileResponse.data.profile.length > 0) {
        setProfile(profileResponse.data.profile[0]); //set profile state as an object

        const indices = await axiosApiService(accessToken).post("/analytics/index", { "index": INDICES } );
        let indicesList = indices.data && Array.isArray(indices.data) ? indices.data : [];
        setIndex(indicesList);

      } else {
        setErrors("Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed.");
      }


      setLoadingProfile(false);
    }
    catch (err) {
      console.log(err);
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
  } else {
    return (
      <>
        {loadingProfile ? <LoadingDialog size="lg" /> : null }
        {error ? <ErrorDialog error={error} /> : null}
        { !profile.enabledToolsOn && <>
          <div style={{ height: "250px" }} className="max-content-module-width-50">
            <div className="max-content-width">
              <h4>Analytics</h4>
              <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available
                logging, reports and configurations around the OpsERA Analytics Platform or search your
                currently configured logs repositories below.</p>
            </div>
            <div className="mt-1 max-content-width mb-1">
              <ConfigurationsForm settings={profile} token={token} />
            </div>
          </div>
          </>}



        { profile.enabledToolsOn && <>
            <div className="mt-3">
              <div className="max-content-width">
                <h4>Analytics</h4>
                <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available
                  logging, reports and configurations around the OpsERA Analytics Platform or search your
                  currently configured logs repositories below.</p>
              </div>
              <div className="p-2 mt-1 max-content-width mb-1">
                <ConfigurationsForm settings={profile} token={token} />
              </div>

              <div className="p-2">

                <div className="mt-1">
                  <Row>

                    <Col sm={8}>
                      <ListGroup horizontal>
                        <ListGroup.Item className={"pointer " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")}>Pipeline</ListGroup.Item>
                        <ListGroup.Item className={"pointer " + (selection === "security" ? "active" : "")} onClick={handleTabClick("security")}>Security</ListGroup.Item>
                        <ListGroup.Item className={"pointer " + (selection === "software_development" ? "active" : "")} onClick={handleTabClick("software_development")}>Software Development</ListGroup.Item>
                        <ListGroup.Item className={"pointer " + (selection === "software_testing" ? "active" : "")} onClick={handleTabClick("software_testing")}>Software Testing</ListGroup.Item>
                        <ListGroup.Item className={"pointer " + (selection === "source_code" ? "active" : "")} onClick={handleTabClick("source_code")}>Source Code</ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col sm={3}>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={renderTooltip}
                      >
                        <DropdownList filter
                                      data={DATELABELS}
                                      className="max-content-width"
                                      valueComponent={ValueInput}
                                      textField='label'
                                      allowCreate="onFilter"
                                      onCreate={handleCreate}
                                      defaultValue={date ?  DATELABELS.find(o => o.value.start === date.start && o.value.end === date.end) : DATELABELS[5]}
                                      onChange={handleDateChange}
                        />
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </div>
                <div className="mt-3">
                  <ChartView token={token} selection={selection} persona={null} date={date} index={index} />
                </div>
              </div>
            </div>
          </>}
{/*
        { !enabledOn || profile.esSearchApi === null || profile.vault !== 200 || profile.esSearchApi.status !== 200 ?
          <div style={{ height: "250px" }} className="max-content-module-width-50">
            <div className="max-content-width">
              <h4>Analytics</h4>
              <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available
           logging, reports and configurations around the OpsERA Analytics Platform or search your
          currently configured logs repositories below.</p>
            </div>
            <div className="mt-1 max-content-width mb-1">
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
          */}

      </>
    );
  }

}


function ChartView({ selection, persona, date, index }) {
  useEffect(() => {
  }, [selection, persona, date.start, index]);

  if (selection) {
    switch (selection) {      
    case "pipeline":
      return (
        <>
          <div className="mt-2">
            <SummaryChartsView date={date} index={index}/>
          </div>
        </>);


    case "security":
      return (
        <>
          <div className="mt-2">
            <ReliabilityMetricsCharts persona={persona} date={date}/>
          </div>
            
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="vulnerabilities" date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="new_vulnerabilities" date={date} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="code_smells" date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <SonarSecurityLineChart persona={persona} sonarMeasure="new_technical_debt" date={date} />
            </div>
          </div>
  
        </>);

    case "software_development":
      return (
        <>

          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <DeploymentFrequencyLineChart persona={persona} date={date}/>
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JiraIssuesCreatedByDateLineChart persona={persona} date={date} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <DeploymentsStackedBarChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <CircleChart persona={persona} date={date} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JiraHealthBySprintBarChart persona={persona} date={date} />
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
          <div className="mt-2">
            <CodeCoverageMetricsView date={date}/>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JMeterHitsLineChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JMeterErrorsLineChart persona={persona} date={date} />
            </div>
          </div>
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JMeterThroughputLineChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JMeterResponseTimeLineChart persona={persona} date={date} />
            </div>
          </div>
          <JMeterResultsTable date={date}/>
        </>);

    case "source_code":
      return (
        <>
          <div className="mt-2">
            <SourceCodeView persona={persona} date={date}/>
          </div>
        </>);

    default:
      return null;
    }
  }

}

ChartView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.object

};


export default Analytics;
