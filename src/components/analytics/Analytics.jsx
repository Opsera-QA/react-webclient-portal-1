import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../common/status_notifications/error";
import { ListGroup, Tooltip, OverlayTrigger, Col, Row } from "react-bootstrap";
import SummaryChartsView from "./views/pipeline/buildView_developer";
import ReliabilityMetricsCharts from "./views/reliability/ReliabilityMetricsView";
import CodeCoverageMetricsView from "./views/sonarCodeCoverageView";
import InfoDialog from "../common/status_notifications/info";
import "./charts/charts.css";
import DeploymentFrequencyLineChart from "./charts/DeploymentFrequencyLineChart.jsx";
import JiraIssuesCreatedByDateLineChart from "./charts/JiraIssuesCreatedByDateLineChart.jsx";
import DeploymentsStackedBarChart from "./charts/DeploymentsStackedBarChart";
import CircleChart from "./charts/CircleChart";
import JiraHealthBySprintBarChart from "./charts/JiraHealthBySprintBarChart";
import SonarSecurityLineChart from "./charts/sonarSecurityLineChart";
import JMeterHitsLineChart from "./charts/JmeterHitsLineChart";
import JMeterErrorsLineChart from "./charts/JmeterErrorsLineChart";
import JMeterThroughputLineChart from "./charts/JmeterThroughputLineChart";
import JMeterResponseTimeLineChart from "./charts/JmeterResponseTimeLineChart";
import JMeterResultsTable from "./metrics/jmeterResultsTable";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import SourceCodeView from "./views/SourceCode/SourceCodeView_developer";
import OperationsView from "./views/opserations_analytics/operationsViewAnalytics_developer";
import AnalyticsProfileSettings from "../settings/analytics/activateAnalyticsCard";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import {AuthContext} from "contexts/AuthContext";
import {axiosApiService} from "api/apiService";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

const INDICES = [
  "jenkins",
  "opsera-pipeline-step-summary",
  "jira",
  "sonar",
  "xunit",
  "junit",
  "jmeter",
  "heartbeat",
  "codeship",
  "gitlab",
  "cypress",
  "metricbeat",
  "anchore",
  "selenium"
];

const DATELABELS = [
  {
    value: {
      start: "now-1h",
      end: "now",
    },
    label: "Last 1 Hour",
  },
  {
    value: {
      start: "now-6h",
      end: "now",
    },
    label: "Last 6 Hours",
  },
  {
    value: {
      start: "now-1d",
      end: "now",
    },
    label: "Last 24 Hours",
  },
  {
    value: {
      start: "now-7d",
      end: "now",
    },
    label: "Last Week",
  },
  {
    value: {
      start: "now-31d",
      end: "now",
    },
    label: "Last Month",
  },
  {
    value: {
      start: "now-90d",
      end: "now",
    },
    label: "Last 3 Months",
  },
];

// TODO: We should refactor this to follow current standards
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
    key: "selection",
  });

  //const [previewRole, setPreviewRole] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") {
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
      <IconBase icon={faCalendar} className={"mr-1 d-none d-lg-inline"} />
      {" " + DATELABELS.find((o) => o.value.start === date.start && o.value.end === date.end).label.toString()}
    </span>
  );

  const handleCreate = (name) => {
    let item = {
      value: "test",
      label: name,
    };

    if (name.toLowerCase().includes("last")) {
      if (name.toLowerCase().includes("week") || name.toLowerCase().includes("weeks")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "w";
        item.value = {
          start: filter,
          end: "now",
        };
        DATELABELS.push(item);
        setDate(item.value);
      } else if (name.toLowerCase().includes("days") || name.toLowerCase().includes("day")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "d";
        item.value = {
          start: filter,
          end: "now",
        };
        DATELABELS.push(item);
        setDate(item.value);
      } else if (name.toLowerCase().includes("months") || name.toLowerCase().includes("month")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "M";
        item.value = {
          start: filter,
          end: "now",
        };
        DATELABELS.push(item);
        setDate(item.value);
      } else if (name.toLowerCase().includes("year") || name.toLowerCase().includes("years")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "y";
        item.value = {
          start: filter,
          end: "now",
        };
        DATELABELS.push(item);
        setDate(item.value);
      } else if (name.toLowerCase().includes("hour") || name.toLowerCase().includes("hours")) {
        let matches = name.match(/(\d+)/);
        let filter = "now-" + matches[0].toString() + "h";
        item.value = {
          start: filter,
          end: "now",
        };
        DATELABELS.push(item);
        setDate(item.value);
      }
    }
  };

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Select timeframe or manually enter in a &ldquo;Last XX Days/Months/Years&rdquo; format
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

      if (!profileResponse.data) {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }

      const indices = await axiosApiService(accessToken).post("/analytics/index", { index: INDICES });
      let indicesList = indices.data && Array.isArray(indices.data) ? indices.data : [];
      setIndex(indicesList);

      if (!Array.isArray(profileResponse.data.profile) || profileResponse.data.profile.length > 0) {
        setProfile(profileResponse.data.profile[0]); //set profile state as an object

        const indices = await axiosApiService(accessToken).post("/analytics/index", { index: INDICES });
        let indicesList = indices.data && Array.isArray(indices.data) ? indices.data : [];
        setIndex(indicesList);
      } else {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }

      setLoadingProfile(false);
    } catch (err) {
      // console.log(err);
      setLoadingProfile(false);
      setErrors(err);
    }
  }

  const handleTabClick = (param) => (e) => {
    e.preventDefault();
    setSelection(param);
    if (param === "operations") {
      setDate({
        start: "now-1d",
        end: "now",
        key: "selection",
      });
    } else {
      setDate({
        start: "now-90d",
        end: "now",
        key: "selection",
      });
    }
  };

  const getBody = () => {
    return (
      <>
      <div className="mt-3">
        {error && <ErrorDialog error={error} align="top"/>}

        {
          !error && profile && !profile.enabledToolsOn &&
          <div className="p-2 mt-1 max-content-width mb-1">
            <AnalyticsProfileSettings />
          </div>
        }

        {profile.enabledToolsOn && !error &&
        <div className="p-2">
          <div className="mt-1">
            <Row>
              <Col sm={8}>
                <ListGroup horizontal>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "pipeline" ? "active" : "")}
                    onClick={handleTabClick("pipeline")}
                  >
                    Pipeline
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "security" ? "active" : "")}
                    onClick={handleTabClick("security")}
                  >
                    Security
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "software_development" ? "active" : "")}
                    onClick={handleTabClick("software_development")}
                  >
                    Software Development
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "software_testing" ? "active" : "")}
                    onClick={handleTabClick("software_testing")}
                  >
                    Software Testing
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "source_code" ? "active" : "")}
                    onClick={handleTabClick("source_code")}
                  >
                    Source Code
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={"pointer list-group-item " + (selection === "operations" ? "active" : "")}
                    onClick={handleTabClick("operations")}
                  >
                    Operations
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={3}>
                <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={renderTooltip}>
                  <StandaloneSelectInput
                    selectOptions={DATELABELS}
                    className="max-content-width"
                    valueComponent={ValueInput}
                    textField="label"
                    allowCreate="onFilter"
                    onCreate={handleCreate}
                    defaultValue={
                      date
                        ? DATELABELS.find((o) => o.value.start === date.start && o.value.end === date.end)
                        : DATELABELS[5]
                    }
                    setDataFunction={handleDateChange}
                  />
                </OverlayTrigger>
              </Col>
            </Row>
          </div>
          <div className="mt-3">
            <ChartView token={token} selection={selection} persona={null} date={date} index={index}/>
          </div>
        </div>}
      </div>
  </>
    );

  };

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"analytics"} />}
      breadcrumbDestination={"analytics"}
      isLoading={loadingProfile}
      pageDescription={`
            Opsera provides users with access to a vast repository of logging and analytics. Access all available
            logging, reports and configurations around the Opsera Analytics Platform or search your currently
            configured logs repositories below.
      `}
    >
      {getBody()}
    </ScreenContainer>
  );
}

function ChartView({ selection, persona, date, index }) {
  useEffect(() => {}, [selection, persona, date.start, index]);

  if (selection) {
    switch (selection) {
    case "pipeline":
      return (
        <>
          <div className="mt-2">
            <SummaryChartsView date={date} index={index}/>
          </div>
        </>
      );

    case "security":
      return (
        <>
          {index.includes("sonar") ? (
            <>
              <div className="mt-2">
                <ReliabilityMetricsCharts persona={persona} date={date}/>
              </div>
              <div className="d-flex">
                <div className="align-self-stretch p-2 w-100">
                  <SonarSecurityLineChart persona={persona} sonarMeasure="vulnerabilities" date={date}/>
                </div>
                <div className="align-self-stretch p-2 w-100">
                  <SonarSecurityLineChart persona={persona} sonarMeasure="new_vulnerabilities" date={date}/>
                </div>
              </div>
              <div className="d-flex">
                <div className="align-self-stretch p-2 w-100">
                  <SonarSecurityLineChart persona={persona} sonarMeasure="code_smells" date={date}/>
                </div>
                <div className="align-self-stretch p-2 w-100">
                  <SonarSecurityLineChart persona={persona} sonarMeasure="new_technical_debt" date={date}/>
                </div>
              </div>
            </>
          ) : (
            <div
              className="mt-3 bordered-content-block p-3 max-content-width"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row>
                <InfoDialog
                  message="No activity data has been captured for this dashboard. In order to activate security metrics contact support@opsera.io"/>
              </Row>
            </div>
          )}
        </>
      );

    case "software_development":
      return (
        <>
          {!index.includes("jenkins") && !index.includes("jira") ? (
            <div
              className="mt-3 bordered-content-block p-3 max-content-width"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row>
                <InfoDialog
                  message="No activity data has been captured for this dashboard. In order to activate software development metrics contact support@opsera.io"/>
              </Row>
            </div>
          ) : (
            <>
              {index.includes("jenkins") ? (
                <div className="d-flex">
                  <div className="align-self-stretch p-2 w-100">
                    <DeploymentFrequencyLineChart persona={persona} date={date}/>
                  </div>
                  <div className="align-self-stretch p-2 w-100">
                    <DeploymentsStackedBarChart persona={persona} date={date}/>
                  </div>
                </div>
              ) : (
                ""
              )}
              {index.includes("jira") ? (
                <div className="d-flex">
                  <div className="align-self-stretch p-2 w-100">
                    <JiraIssuesCreatedByDateLineChart persona={persona} date={date}/>
                  </div>
                  <div className="align-self-stretch p-2 w-100">
                    <JiraHealthBySprintBarChart persona={persona} date={date}/>
                  </div>
                </div>
              ) : (
                ""
              )}
              {index.includes("jenkins") ? (
                <div className="d-flex">
                  <div className="align-self-stretch p-2 w-100">
                    <CircleChart persona={persona} date={date}/>
                  </div>
                  <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 4  */}</div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </>
      );

    case "software_testing":
      return (
        <>
          {!index.includes("sonar") && !index.includes("jmeter") ? (
            <div
              className="mt-3 bordered-content-block p-3 max-content-width"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row>
                <InfoDialog
                  message="No activity data has been captured for this dashboard. In order to activate software testing metrics contact support@opsera.io"/>
              </Row>
            </div>
          ) : (
            <>
              {index.includes("sonar") ? (
                <div className="mt-2">
                  <CodeCoverageMetricsView date={date}/>
                </div>
              ) : (
                ""
              )}
              {index.includes("jmeter") ? (
                <>
                  <div className="d-flex">
                    <div className="align-self-stretch p-2 w-100">
                      <JMeterHitsLineChart persona={persona} date={date}/>
                    </div>
                    <div className="align-self-stretch p-2 w-100">
                      <JMeterErrorsLineChart persona={persona} date={date}/>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="align-self-stretch p-2 w-100">
                      <JMeterThroughputLineChart persona={persona} date={date}/>
                    </div>
                    <div className="align-self-stretch p-2 w-100">
                      <JMeterResponseTimeLineChart persona={persona} date={date}/>
                    </div>
                  </div>
                  <JMeterResultsTable date={date}/>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </>
      );

    case "source_code":
      return (
        <>
          {index.includes("gitlab") ? (
            <div className="mt-2">
              <SourceCodeView persona={persona} date={date}/>
            </div>
          ) : (
            <div
              className="mt-3 bordered-content-block p-3 max-content-width"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row>
                <InfoDialog
                  message="No activity data has been captured for this dashboard. In order to activate source code metrics contact support@opsera.io"/>
              </Row>
            </div>
          )}
        </>
      );

      case "operations":
        return (
          <>
            {index.includes("metricbeat") ? (
              <div className="mt-2">
                <OperationsView persona={persona} date={date} />
              </div>
            ) : (
              <div
                className="mt-3 bordered-content-block p-3 max-content-width"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Row>
                  <InfoDialog message="No activity data has been captured for this dashboard. In order to activate source code metrics contact support@opsera.io" />
                </Row>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  }
}

ChartView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.array,
};

Analytics.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.array,
  item: PropTypes.object
};

export default Analytics;
