import React, { useState, useEffect, useContext } from "react";
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

function NotificationDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [notificationData, setNotificationData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getNotificationData();
  }, []);

  const getNotificationData = async () => {
    try {
      setIsLoading(true);
      const response = await notificationsActions.getNotificationById(id, getAccessToken);
     
      if (response?.data[0] != null) {
        setNotificationData(new Model(response?.data[0], notificationMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
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
          <ActionBarDeleteButton2 relocationPath={"/notifications/"} handleDelete={deleteNotification} dataObject={notificationData} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    // TODO: We should really be pulling icon, managementViewLink, managementTitle, etc  from trails. I need to make another container
    <DetailScreenContainer
      breadcrumbDestination={"notificationDetailView"}
      metadata={notificationMetadata}
      dataObject={notificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<NotificationDetailPanel notificationData={notificationData} isLoading={isLoading} setNotificationData={setNotificationData} loadData={getNotificationData}/>}
    />
  )
}

export default NotificationDetailView;