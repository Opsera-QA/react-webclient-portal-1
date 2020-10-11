import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/status_notifications/error";
import LoadingDialog from "../common/status_notifications/loading";
import { Alert } from "react-bootstrap";
import SearchLogs from "./searchLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";
import LoadingView from "../common/status_notifications/loading";

function Logs() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [tools, setTools] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  const [profile, setProfile] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [enabledOn, setEnabledOn] = useState(true);
  const INDICES = [
    "jenkins",
    "opsera-pipeline",
    "jira",
    "sonar",
    "xunit",
    "junit",
    "jmeter",
    "heartbeat",
    "codeship",
    "gitlab",
    "metricbeat",
  ];

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        // console.log("FETCHING DATA");
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log("Request was canceled via controller.abort");
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
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";
    setToken(accessToken);
    try {
      const profile = await axiosApiService(accessToken).get(apiUrl);
      setProfile(profile.data);
      let dataObject = profile.data && profile.data.profile.length > 0 ? profile.data.profile[0] : {};
      setIsEnabled(dataObject.active !== undefined ? dataObject.active : false);
      setEnabledOn(dataObject.enabledToolsOn && dataObject.enabledToolsOn.length !== 0 ? true : false);

      const tools = await axiosApiService(accessToken).post("/analytics/index", { index: INDICES });
      const listOfTools = tools.data && Array.isArray(tools.data) ? tools.data : [];
      if (listOfTools.includes("jenkins")) listOfTools.push("blueprint");
      listOfTools.sort();

      // console.log("Profile: ", profile);
      setData(profile && profile.data.profile[0]);
      setTools(listOfTools);
      // console.log(profile && profile.data.profile[0]);

      if (typeof data.profile === "object" && data.profile.length === 0) {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }

      setLoadingProfile(false);
    } catch (err) {
      // console.log(err.message);
      setLoadingProfile(false);
      setErrors(err);
    }
  }

  return (
    <div className="mb-3 max-charting-width">
      {error && <ErrorDialog error={error} align="top" />}

      <div className="max-content-width">
        <h4>Logs</h4>
        <p>
          OpsERA provides users with access to a vast repository of logging with industry leading search and filtering
          capability. Access all available logging, reports and configurations around the OpsERA Analytics Platform or
          search your currently configured logs repositories below.{" "}
        </p>
      </div>

      {!error && (
        <div className="shaded-panel p-3 mt-1">
          {loadingProfile
            ? <LoadingDialog size="sm" message="Loading Profile" />
            : <SearchLogs tools={tools} />}
        </div>
      )}
    </div>
  );
}

export default Logs;
