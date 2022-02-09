import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import notificationsActions from "../notifications-actions";
import notificationMetadata from "../notifications-metadata";
import NotificationDetailPanel from "./NotificationDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import axios from "axios";
import NotificationSubNavigationBar from "components/notifications/NotificationSubNavigationBar";

function NotificationDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [notificationData, setNotificationData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    await getNotificationData(cancelSource);
  };

  const getNotificationData = async (cancelSource = cancelTokenSource) => {
   const response = await notificationsActions.getNotificationByIdV2(getAccessToken, cancelSource, id);
   // TODO: When adding notification and notification method constants, please update route to just send the one notification
   const notificationArray = response?.data;

   if(isMounted.current === true && Array.isArray(notificationArray) && notificationArray.length > 0){
     setNotificationData(new Model(notificationArray[0], notificationMetadata, false));
   }
  };

  const deleteNotification = async () => {
    return await notificationsActions.deleteNotification(notificationData, getAccessToken);
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/notifications"} />
        </div>
        <div>
          <ActionBarDeleteButton2
            relocationPath={"/notifications/"}
            handleDelete={deleteNotification}
            dataObject={notificationData}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"notificationDetailView"}
      metadata={notificationMetadata}
      navigationTabContainer={<NotificationSubNavigationBar currentTab={"notificationViewer"} />}
      dataObject={notificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <NotificationDetailPanel
          notificationData={notificationData}
          isLoading={isLoading}
          setNotificationData={setNotificationData}
          loadData={getNotificationData}
        />
      }
    />
  );
}

export default NotificationDetailView;