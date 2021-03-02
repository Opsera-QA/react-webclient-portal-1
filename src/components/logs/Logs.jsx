import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import LogSearch from "components/logs/LogSearch";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";

function Logs() {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setErrors] = useState();
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);
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
    const response = await analyticsActions.getAnalyticsSettingsV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      const tempProfile = response?.data;
      let profileData = tempProfile.profile?.length > 0 ? tempProfile.profile[0] : {};

      const toolResponse = await analyticsActions.getAnalyticsToolsV2(getAccessToken, cancelSource);
      const listOfTools = Array.isArray(toolResponse?.data) ? toolResponse.data : [];

      if (listOfTools) {
        if (listOfTools.includes("jenkins")) {
          listOfTools.push("blueprint");
        }
        listOfTools.sort();
        setTools(listOfTools);
      }

      // console.log("Profile: ", JSON.stringify(profileData));
      // console.log(profile && profile.data.profile[0]);

      if (typeof profileData.profile === "object" && profileData.profile.length === 0) {
        setErrors(
          "Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed."
        );
      }
    }
  }

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size="sm" message="Loading..." />;
    }

    if (error) {
      return <ErrorDialog error={error} align="top" />;
    }

    if (sideBySide) {
      return (
        <div className={"d-flex"}>
          <div className={"w-50 pr-2"}><LogSearch tools={tools} sideBySide={sideBySide} /></div>
          <div className={"w-50 pl-2"}><LogSearch tools={tools} sideBySide={sideBySide} /></div>
        </div>
      );
    }

    return (<LogSearch tools={tools} sideBySide={sideBySide} />);
  };

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
      <div className="px-3">
        {getBody()}
      </div>
    </ScreenContainer>
  );
}

export default Logs;
