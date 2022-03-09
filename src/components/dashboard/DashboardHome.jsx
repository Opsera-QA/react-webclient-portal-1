import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/status_notifications/error";
import LogsDashboard from "components/dashboard/LogsDashboard";
import PipelineDashboard_v2 from "../../components/dashboard/v2/Pipeline";
import SecOpsDashboard_v2 from "../../components/dashboard/v2/SecOps";
import QualityDashboard from "../../components/dashboard/v2/Quality";
import OperationsDashboard from "../../components/dashboard/v2/Operations";
import PlanningDashboard from "../../components/dashboard/v2/Planning";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import LoadingView from "../common/status_notifications/loading";
import AnalyticsProfileSettings from "../settings/analytics/activateAnalyticsCard";
import { DialogToastContext } from "contexts/DialogToastContext";
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
  "selenium",
];
const PERSONAS = [
  { value: "developer", label: "Developer" },
  { value: "manager", label: "Manager" },
  { value: "executive", label: "Executive" },
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

function DashboardHome() {
  const contextType = useContext(AuthContext);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState([]);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [label, setLabel] = useState("Last 3 Months");
  const { getUserRecord, setAccessRoles } = contextType;
  const [personaDisabled, setPersonaDisabled] = useState(false);
  const toastContext = useContext(DialogToastContext);
  let userAccess = {};

  const getRoles = async () => {
    const user = await getUserRecord();
    userAccess = await setAccessRoles(user);
    if (userAccess) {
      if (userAccess.Role === "free_trial") {
        setPersonaDisabled(true);
      }
    }
  };

  const [date, setDate] = useState({
    start: "now-90d",
    end: "now",
    key: "selection",
  });

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    };
    runEffect();
    getRoles();
    return () => {
      controller.abort();
    };
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType; //getIsPreviewRole
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";
    setToken(accessToken);

    try {
      const result = await axiosApiService(accessToken).get(apiUrl);
      setData(result.data);

      if (!result.data) {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }

      const indices = await axiosApiService(accessToken).post("/analytics/index", { index: INDICES });
      let indicesList = indices.data && Array.isArray(indices.data) ? indices.data : [];
      setIndex(indicesList);

      let dataObject = result.data && result.data.profile.length > 0 ? result.data.profile[0] : {};
      let persona = dataObject.defaultPersona
        ? dataObject.defaultPersona.length > 0
          ? dataObject.defaultPersona
          : "developer"
        : "developer";
      setPersona(persona);

      const { profile } = result.data;
      setProfile(profile[0]);
      setLoading(false);
    } catch (err) {
      // setErrors(err);
      toastContext.showInlineErrorMessage(err);
      setLoading(false);
    }
  }

  const handleTabClick = (param) => (e) => {
    e.preventDefault();
    if (param === "operations_v2") {
      handleDateChange(DATELABELS[5]);
    }
    setSelection(param);
  };

  const handleSelectPersonaChange = (selectedOption) => {
    setPersona([selectedOption.selecton]);
  };

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

  ValueInput.propTypes = {
    item: PropTypes.any,
  };

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

  if (loading) {
    return <LoadingView size="sm" />;
  }

  return (
    <div className="mb-3 max-charting-width">
      {hasError && <ErrorDialog error={hasError} align="top" />}

      <div className="mt-2 mb-3">
        <div className="max-content-width mb-4">
          <div className="h4 mt-3 mb-4">My Dashboard</div>
          <p>
            Opsera offers the best, easy to use solutions for deploying, monitoring and managing your entire automation
            and workflow pipelines, enabling organizations to build optimized and efficient DevOps based projects.
          </p>
        </div>

        {!hasError && profile && profile.enabledToolsOn && (
          <>
            <Row>
              <Col sm={8}>
                <ul className="nav nav-pills ml-2 mb-2">
                  <li className="nav-item">
                    <a
                      className={"nav-link " + (selection === "pipeline" ? "active" : "")}
                      onClick={handleTabClick("pipeline")}
                      href="#"
                    >
                      Pipeline
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={"nav-link " + (selection === "planning" ? "active" : "")}
                      onClick={handleTabClick("planning")}
                      href="#"
                    >
                      Planning
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={"nav-link " + (selection === "secops_v2" ? "active" : "")}
                      onClick={handleTabClick("secops_v2")}
                      href="#"
                    >
                      SecOps
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={"nav-link " + (selection === "quality_v2" ? "active" : "")}
                      onClick={handleTabClick("quality_v2")}
                      href="#"
                    >
                      Quality
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={"nav-link " + (selection === "operations_v2" ? "active" : "")}
                      onClick={handleTabClick("operations_v2")}
                      href="#"
                    >
                      Operations
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={2}>
                <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={renderTooltip}>
                  <StandaloneSelectInput
                    disabled={selection === "operations_v2"}
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

              <Col sm={2}>
                {personaDisabled ? (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Persona based analytics is unavailable as part of the free trial.
                      </Tooltip>
                    }
                  >
                    <span>
                      <StandaloneSelectInput
                        selectOptions={PERSONAS}
                        className="basic-single mr-2"
                        valueField="value"
                        textField="label"
                        disabled={personaDisabled}
                        defaultValue={persona ? PERSONAS.find((o) => o.value === persona) : PERSONAS[0]}
                        setDataFunction={handleSelectPersonaChange}
                      />
                    </span>
                  </OverlayTrigger>
                ) : (
                  <StandaloneSelectInput
                    selectOptions={PERSONAS}
                    className="basic-single mr-2"
                    valueField="value"
                    textField="label"
                    disabled={personaDisabled}
                    defaultValue={persona ? PERSONAS.find((o) => o.value === persona) : PERSONAS[0]}
                    setDataFunction={handleSelectPersonaChange}
                  />
                )}
              </Col>
            </Row>

            <DashboardView selection={selection} persona={persona} date={date} index={index} />
          </>
        )}

        {profile && !profile.enabledToolsOn && (
          <div className="mt-1 max-content-width mb-1">
            <AnalyticsProfileSettings />
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardView({ selection, persona, date, index }) {
  useEffect(() => {
    //console.log("CHANGE HAPPENED");
  }, [selection, persona, date.start, index]);

  if (selection) {
    switch (selection) {
      case "logs":
        return <LogsDashboard persona={persona} />;
      case "pipeline":
        return <PipelineDashboard_v2 persona={persona} date={date} index={index} />;
      case "secops_v2":
        return <SecOpsDashboard_v2 persona={persona} date={date} index={index} />;
      case "quality_v2":
        return <QualityDashboard persona={persona} date={date} index={index} />;
      case "operations_v2":
        return <OperationsDashboard persona={persona} index={index} />;
      case "planning":
        return <PlanningDashboard persona={persona} date={date} index={index} />;
      default:
        return null;
    }
  }
}

DashboardView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.array,
};

export default DashboardHome;
