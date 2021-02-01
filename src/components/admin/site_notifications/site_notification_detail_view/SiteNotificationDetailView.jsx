import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotificationMetadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import SiteNotificationDetailPanel
  from "components/admin/site_notifications/site_notification_detail_view/SiteNotificationDetailPanel";
import Model from "core/data_model/model";

function SiteNotificationDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [siteNotificationData, setSiteNotificationData] = useState(undefined);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSiteNotification = async () => {
    const response = await siteNotificationActions.getSiteNotification(id, getAccessToken);

    if (response?.data) {
      setSiteNotificationData(new Model(response.data, siteNotificationMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getSiteNotification();
      }
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
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationDetailView"}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      metadata={siteNotificationMetadata}
      dataObject={siteNotificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<SiteNotificationDetailPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} />}
    />
  );
}

export default SiteNotificationDetailView;