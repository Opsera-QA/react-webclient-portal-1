import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import slackConnectorActions from "components/inventory/tools/tool_details/tool_jobs/slack/slack-actions";

function SlackToolConfigurationSummaryPanel() {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [token, setToken] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getSlackToken(cancelSource);
    }
    catch (error) {
      // If error is not service unavailable, assume Slack has just not been connected
      if (error.message.includes(503)) {
        toastContext.showServiceUnavailableDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSlackToken = async (cancelSource = cancelTokenSource) => {
    const response = await slackConnectorActions.getSlackConnectorSettingsV2(getAccessToken, cancelSource);
    const token = response?.data?.slackToken;

    if (isMounted?.current === true && token) {
      setToken(token);
    }
  };

  if (isLoading === true) {
    return (<LoadingDialog size="sm"/>);
  }

  if (token != null) {
    return (
      <div className="m-3">
        <div className="h5">Slack Configured!</div>
        <div>Your Slack token is connected to this tool and ready for use in the pipelines.</div>
        <div>If you would like to replace it, add to Slack with a different account.</div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div>You have not connected this tool to Slack.</div>
    </div>
  );
}

SlackToolConfigurationSummaryPanel.propTypes = {};

export default SlackToolConfigurationSummaryPanel;
