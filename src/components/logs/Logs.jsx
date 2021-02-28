import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {axiosApiService} from "api/apiService";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import SearchLogs from "components/logs/searchLogs";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";

function Logs() {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [tools, setTools] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    "cypress",
    "anchore"
  ];
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSettings(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadSettings = async (cancelSource = cancelTokenSource) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";
    const profile = await axiosApiService(accessToken).get(apiUrl);
    const response = await analyticsActions.getAnalyticsSettingsV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setProfile(profile.data);
      let dataObject = profile.data && profile.data.profile.length > 0 ? profile.data.profile[0] : {};
      setIsEnabled(dataObject?.active || false);
      setEnabledOn(!!(dataObject.enabledToolsOn && dataObject.enabledToolsOn.length !== 0));

      const tools = await axiosApiService(accessToken).post("/analytics/index", {index: INDICES});
      const listOfTools = tools.data && Array.isArray(tools.data) ? tools.data : [];
      if (listOfTools.includes("jenkins")) listOfTools.push("blueprint");
      listOfTools.sort();

      // console.log("Profile: ", profile);
      const profileData = profile?.data?.profile[0];
      setData(profileData);
      setTools(listOfTools);
      // console.log(profile && profile.data.profile[0]);

      if (typeof profileData.profile === "object" && profileData.profile.length === 0) {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }
    }
  }

  return (
    <ScreenContainer
      isLoading={isLoading}
      breadcrumbDestination={"logs"}
      pageDescription={`
          Opsera provides users with access to a vast repository of logging with industry leading search and filtering
          capability. Access all available logging, reports and configurations around the Opsera Analytics Platform or
          search your currently configured logs repositories below.
      `}
    >
      {error && <ErrorDialog error={error} align="top" />}
      {!error && (
        <div className="shaded-panel p-3 mt-1">
          {isLoading
            ? <LoadingDialog size="sm" message="Loading..." />
            : <SearchLogs tools={tools} />}
        </div>
      )}
    </ScreenContainer>
  );
}

export default Logs;
