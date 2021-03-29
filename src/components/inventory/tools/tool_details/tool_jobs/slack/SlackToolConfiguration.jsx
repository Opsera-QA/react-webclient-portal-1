import React, {useEffect, useContext, useState} from "react";
import slackConnectorActions from "./slack-actions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import apiConnectorActions from "components/api_connector/api-connector-actions";

function SlackToolConfiguration({ toolData }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [token, setToken] = useState(undefined);
  const [slackUrl, setSlackUrl] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if (toolData != null) {
      loadData();
    }
  }, []);


  const loadData = async () => {
    try {
      setIsLoading(true);
      await getSlackUrl();
      await getSlackToken();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // TODO: Pull token from toolData's configuration once this is wired up, instead of doing the API call.
  const getSlackToken = async () => {
    // let toolConfiguration = toolData["configuration"];
    // if (toolConfiguration != null && toolConfiguration["slackToken"] != null) {
    //   setToken(toolConfiguration["slackToken"]);
    // }

    try {
      let response = await apiConnectorActions.getConnectorSettings("slack", getAccessToken);
      if (response.data != null && response.data["slackToken"] !== undefined) {
        setToken(response.data["slackToken"]);
      }
    }
    catch (error) {
      // If error is not service unavailable, assume Slack has just not been connected
      if (error.message.includes(503)) {
        toastContext.showServiceUnavailableDialog(error);
      }
    }
  };

  const getSlackUrl = async () => {
    let slackResponse = await slackConnectorActions.getSlackUrl(toolData.getData("_id"), getAccessToken);

    if (slackResponse?.data != null && slackResponse?.data?.status === 200) {
      setSlackUrl(slackResponse.data.message);
    }
  };

  const addSlackCredentials = () => {
    let redirectURI = process.env.REACT_APP_OPSERA_API_SERVER_URL + "/proxy/microservice/slack/authentication";
    if (slackUrl) {
      window.open(`${slackUrl}&redirect_uri=${redirectURI}`);
    }
  };

  const getSlackButton = () => {
    if (slackUrl == null) {
      return (
        <ErrorDialog error={"Could not get Slack URL required to connect account."} />
      );
    }

    return (
    <img alt="Add to Slack" className="pointer"
         height="40"
         width="139"
         src="https://platform.slack-edge.com/img/add_to_slack.png"
         onClick={() => addSlackCredentials()}
         srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x,
         https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
    );
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Slack Credentials"} />);
  }

  if (toolData == null) {
    return (
      <div className="m-3">
        <div className="h5">Slack Credentials</div>
        <div>You can connect to Slack using credentials stored on a per-tool basis in the <Link to="/inventory/tools">Tool Registry</Link>.</div>
        <div>To get started, create a Slack tool and connect to Slack using the Add to Slack button on the Slack tool&apos;s connection panel.</div>
      </div>
    );
  }

  if (!isLoading && token != null) {
    return (
      <div className="m-3">
        <div className="h5">Slack Configured!</div>
        <div>Your Slack token is connected to this tool and ready for use in the pipelines.</div>
        <div>If you would like to replace it, add to Slack with a different account.</div>
        <div className="pt-2">{getSlackButton()}</div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div>You have not connected this tool to Slack.</div>
      <div className="pt-2">{getSlackButton()}</div>
    </div>
  );
}


SlackToolConfiguration.propTypes = {
  toolData: PropTypes.object
};

export default SlackToolConfiguration;