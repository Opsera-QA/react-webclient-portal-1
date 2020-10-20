import React, {useEffect, useContext, useState} from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import LoadingDialog from "../../common/status_notifications/loading";
import {DialogToastContext} from "../../../contexts/DialogToastContext";

function MicrosoftTeamsApiConnector() {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [token, setToken] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {
    try {
      setIsLoading(true);
      // let response = await apiConnectorActions.getConnectorSettings("microsoftTeams", getAccessToken);
      //
      // if (response.data["slackToken"] !== undefined) {
      //   setToken(response.data["slackToken"]);
      // }
      // else {
      //   let slackResponse = await slackConnectorActions.getSlackUrl(getAccessToken);
      //   setSlackUrl(slackResponse.data["message"]);
      // }
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }


  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Slack Credentials"} />);
  }

  if (!isLoading && token != null) {
    return (
      <div className="m-3">
        <div className="h5">Microsoft Teams Configured!</div>
        <div>Your Microsoft Teams token is active and ready for use in the pipelines.</div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div>You have not connected to Microsoft Teams with your account.</div>
      <div className="pt-2">
        {/*TODO: Add Microsoft Teams Connector*/}
      </div>
    </div>
  );
}

export default MicrosoftTeamsApiConnector;