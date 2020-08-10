import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
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
          {error ? <ErrorDialog error={error} /> : null}

          {(!isEnabled ||
            !enabledOn ||
            profile.esSearchApi === null ||
            profile.vault !== 200 ||
            profile.esSearchApi.status !== 200) &&
          !error ? (
            <div style={{ height: "250px" }} className="max-content-module-width-50">
              <div className="row h-100">
                <div className="col-sm-12 my-auto">
                  <Alert variant="warning">
                    Your Analytics configurations are incomplete. Please review the details below in order to determine
                    what needs to be done.
                  </Alert>
                  <div className="text-muted mt-4">
                    <div className="mb-3">
                      In order to take advantage of the robust analytics dashboards offered by OpsERA, the following
                      configurations are necessary:
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Your Analytics account must be enabled for yourself or your organization.
                        {enabledOn ? (
                          <span className="badge badge-success badge-pill">
                            <FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth />
                          </span>
                        ) : (
                          <span className="badge badge-warning badge-pill">
                            <FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth />
                          </span>
                        )}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        An OpsERA Analytics instance must be spun up and configured with your pipeline tools.
                        {profile.esSearchApi === undefined ||
                        profile.esSearchApi === null ||
                        profile.esSearchApi.status !== 200 ? (
                          <span className="badge badge-warning badge-pill">
                            <FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth />
                          </span>
                        ) : (
                          <span className="badge badge-success badge-pill">
                            <FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth />
                          </span>
                        )}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        OpsERA Analytics authentication information must be secured and available.
                        {profile.vault === undefined || profile.vault !== 200 ? (
                          <span className="badge badge-warning badge-pill">
                            <FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth />
                          </span>
                        ) : (
                          <span className="badge badge-success badge-pill">
                            <FontAwesomeIcon icon={faCheckCircle} className="" size="lg" fixedWidth />
                          </span>
                        )}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Pipeline activity must have occurred in order for the system to collect data for display.
                        <span className="badge badge-warning badge-pill">
                          <FontAwesomeIcon icon={faQuestion} className="" size="lg" fixedWidth />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pr-2 mt-1">
              <SearchLogs tools={tools} />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Logs;
