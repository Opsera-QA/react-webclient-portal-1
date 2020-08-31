import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
      } else if (profile.data && profile.data.vault !== 200) {
        console.error("Error Code " + profile.data.vault + " with the following message: " + profile.data.message)
        setErrors(
          "Error Reported: Vault has returned a message: " + profile.data.message
        );
      }

      setLoadingProfile(false);
    } catch (err) {
      // console.log(err.message);
      setLoadingProfile(false);
      setErrors(err.message);
    }
  }

  return (
    <div className="mb-3 max-charting-width">
      {loadingProfile ? <LoadingDialog size="lg" /> : null}
      {!loadingProfile ? (
        <>
          <div className="mt-2 mb-3"></div>

          <div className="max-content-width">
            <h4>Logs</h4>
            <p>
              OpsERA provides users with access to a vast repository of logging with industry leading search and
              filtering capability. Access all available logging, reports and configurations around the OpsERA Analytics
              Platform or search your currently configured logs repositories below.{" "}
            </p>
          </div>
          {error ? <ErrorDialog error={error} /> : 
          <div className="pr-2 mt-1">
              <SearchLogs tools={tools} />
            </div>}
        </>
      ) : null}
    </div>
  );
}

export default Logs;
