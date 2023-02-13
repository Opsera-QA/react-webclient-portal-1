import React from "react";
import { useParams } from "react-router-dom";
import notificationMetadata from "../notifications-metadata";
import NotificationPolicyDetailPanel from "components/notifications/details/NotificationPolicyDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import NotificationPolicySubNavigationBar from "components/notifications/NotificationPolicySubNavigationBar";
import NotificationDetailViewHelpDocumentation
  from "components/common/help/documentation/notifications/NotificationDetailViewHelpDocumentation";
import useGetNotificationPolicyModelById from "hooks/notification_policies/model/useGetNotificationPolicyModelById";
import DeleteNotificationPolicyActionBarButton
  from "components/notifications/actions/DeleteNotificationPolicyActionBarButton";

function NotificationPolicyDetailView() {
  const { id } = useParams();
  const {
    notificationPolicyModel,
    setNotificationPolicyModel,
    isLoading,
    error,
    loadData,
  } = useGetNotificationPolicyModelById(id);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/notifications"} />
        </div>
        <div>
          <DeleteNotificationPolicyActionBarButton
            notificationPolicyModel={notificationPolicyModel}
            className={"ml-3"}
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
      navigationTabContainer={<NotificationPolicySubNavigationBar activeTab={"notificationViewer"} />}
      dataObject={notificationPolicyModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      // helpComponent={getHelpComponent()}
      detailPanel={
        <NotificationPolicyDetailPanel
          notificationData={notificationPolicyModel}
          isLoading={isLoading}
          setNotificationData={setNotificationPolicyModel}
          loadData={loadData}
        />
      }
    />
  );
}

export default NotificationPolicyDetailView;