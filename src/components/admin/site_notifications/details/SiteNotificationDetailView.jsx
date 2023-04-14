import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import SiteNotificationDetailPanel
  from "components/admin/site_notifications/details/SiteNotificationDetailPanel";
import Model from "core/data_model/model";
import SiteNotificationManagementSubNavigationBar
  from "components/admin/site_notifications/SiteNotificationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function SiteNotificationDetailView() {
  const [siteNotificationData, setSiteNotificationData] = useState(undefined);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    getAccessToken,
    isOpseraAdministrator,
    toastContext,
    isMounted,
    cancelTokenSource,
    accessRoleData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  },[]);

  const loadData = async () => {
    try {
      setSiteNotificationData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getSiteNotification();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSiteNotification = async () => {
    const response = await siteNotificationActions.getSiteNotificationV2(id, getAccessToken, cancelTokenSource);

    if (isMounted?.current === true && response?.data) {
      setSiteNotificationData(new Model(response.data, siteNotificationMetadata, false));
    }
  };

  const getActionBar = () => {
    if (siteNotificationData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/admin/site-notifications"}/>
          </div>
          <div>
            <ActionBarDeleteButton2 dataObject={siteNotificationData} relocationPath={"/admin/site-notifications"} handleDelete={handleDelete}/>
          </div>
        </ActionBarContainer>
      );
    }
  };

  const handleDelete = async () => {
    return await siteNotificationActions.deleteSiteNotification(siteNotificationData, getAccessToken);
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationDetailView"}
      metadata={siteNotificationMetadata}
      dataObject={siteNotificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={<SiteNotificationManagementSubNavigationBar activeTab={"siteNotificationManager"}/>}
      detailPanel={<SiteNotificationDetailPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} accessRoleData={accessRoleData} />}
    />
  );
}

export default SiteNotificationDetailView;