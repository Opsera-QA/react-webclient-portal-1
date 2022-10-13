import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import teamsNotificationMetadata from "./inputs/teams/teamsNotificationMetadata";
import slackNotificationMetadata from "./inputs/slack/slackNotificationMetadata";
import axios from "axios";
import modelHelpers from "components/common/model/modelHelpers";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import gChatNotificationMetadata from "./inputs/gchat/gChatNotificationMetadata";
import DashboardNotificationTabView from "./DashboardNotificationTabView";
import emailNotificationMetadata from "./inputs/email/emailNotificationMetadata";

function DashboardNotificationsEditorPanel(
  {
    model,
    setModel,    
  }) {
  const toastContext = useContext(DialogToastContext);
  const [teamsNotificationModel, setTeamsNotificationModel] = useState(undefined);
  const [slackNotificationModel, setSlackNotificationModel] = useState(undefined);
  const [gChatNotificationModel, setGChatNotificationModel] = useState(undefined);
  const [emailNotificationModel, setEmailNotificationModel] = useState(undefined);
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadConfiguration();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = async () => {

    const emailNotification = model?.getArrayData("notification")?.find((notification) => notification.type === "email");
    setEmailNotificationModel(modelHelpers.parseObjectIntoModel(emailNotification, emailNotificationMetadata));

    const slackNotification = model?.getArrayData("notification")?.find((notification) => notification.type === "slack");
    setSlackNotificationModel(modelHelpers.parseObjectIntoModel(slackNotification, slackNotificationMetadata));

    const teamsNotification = model?.getArrayData("notification")?.find((notification) => notification.type === "teams");
    setTeamsNotificationModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsNotificationMetadata));

    const gChatNotification = model?.getArrayData("notification")?.find((notification) => notification.type === "gchat");
    setGChatNotificationModel(modelHelpers.parseObjectIntoModel(gChatNotification, gChatNotificationMetadata));
  };

  const setEmailNotificationHandler = (newModel) => {
    setModelValues(newModel.getPersistData(), "email");
    setEmailNotificationModel({...newModel});
  };

  const setGChatNotificationHandler = (newModel) => {
    setModelValues(newModel.getPersistData(), "gchat");
    setGChatNotificationModel({...newModel});
  };

  const setTeamsNotificationHandler = (newModel) => {
    setModelValues(newModel.getPersistData(), "teams");
    setTeamsNotificationModel({...newModel});
  };

  const setSlackNotificationHandler = (newModel) => {
    setModelValues(newModel.getPersistData(), "slack");
    setSlackNotificationModel({...newModel});
  };

  const setModelValues = (data, notificationId) => {
    let newModel = {...model};
    const notificationArray = newModel?.getArrayData("notification");
    let newNotificationArray = notificationArray.filter((notification) => notification.type !== notificationId);
    newModel.setData("notification", [...newNotificationArray, data]);
  };

  const getTitleBar = () => {
    return (
      <div>
        <div className="text-muted mt-2 mb-3">Dashboard notifications can be configured to send notifications based on the threshholds set for the KPI.
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Notification Configuration"} size={"sm"} />;
  }

  return (
    <OverlayPanelBodyContainer
      hideCloseButton={true}
    >
      {getTitleBar()}
      <DashboardNotificationTabView
        slackNotificationModel={slackNotificationModel}
        setSlackNotificationModel={setSlackNotificationHandler}
        teamsNotificationModel={teamsNotificationModel}
        setTeamsNotificationModel={setTeamsNotificationHandler}
        gChatNotificationModel={gChatNotificationModel}
        setGChatNotificationModel={setGChatNotificationHandler}
        emailNotificationModel={emailNotificationModel}
        setEmailNotificationModel={setEmailNotificationHandler}
      />
    </OverlayPanelBodyContainer>
  );
}

DashboardNotificationsEditorPanel.propTypes = {  
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DashboardNotificationsEditorPanel;
