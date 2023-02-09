import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import notificationsActions from "../notifications-actions";
import notificationMetadata from "../notifications-metadata";
import NotificationDetailPanel from "./NotificationDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import NotificationSubNavigationBar from "components/notifications/NotificationSubNavigationBar";
import NotificationDetailViewHelpDocumentation
  from "components/common/help/documentation/notifications/NotificationDetailViewHelpDocumentation";
import useGetNotificationPolicyModelById from "hooks/notification_policies/model/useGetNotificationPolicyModelById";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";

function NotificationDetailView() {
  const { id } = useParams();
  const {
    notificationPolicyModel,
    setNotificationPolicyModel,
    isLoading,
    error,
    loadData,
  } = useGetNotificationPolicyModelById(id);
  const notificationPolicyActions = useNotificationPolicyActions();

  const deleteNotification = async () => {
    return await notificationPolicyActions.deleteNotificationPolicy(notificationPolicyModel?.getMongoDbId());
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
            dataObject={notificationPolicyModel}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getHelpComponent = () => {
    return (
      <NotificationDetailViewHelpDocumentation
        type={notificationPolicyModel?.getData("type")}
        method={notificationPolicyModel?.getData("method")}
      />
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"notificationDetailView"}
      metadata={notificationMetadata}
      navigationTabContainer={<NotificationSubNavigationBar activeTab={"notificationViewer"} />}
      dataObject={notificationPolicyModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      // helpComponent={getHelpComponent()}
      detailPanel={
        <NotificationDetailPanel
          notificationData={notificationPolicyModel}
          isLoading={isLoading}
          setNotificationData={setNotificationPolicyModel}
          loadData={loadData}
        />
      }
    />
  );
}

export default NotificationDetailView;