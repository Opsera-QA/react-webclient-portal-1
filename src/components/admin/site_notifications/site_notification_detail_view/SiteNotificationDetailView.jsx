import React, { useState, useEffect, useContext } from "react";
import SiteNotificationDetailPanel from "./SiteNotificationDetailPanel";
import { useParams } from "react-router-dom";
import siteNotificationActions from "../site-notification-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import siteNotificationMetadata from "../siteNotificationMetadata";

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
      await getSiteNotification();
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

    if (response != null && response.data != null) {
      setSiteNotificationData(new Model(response.data, siteNotificationMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getActionBar = () => {
    if (siteNotificationData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/admin/banners"} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationDetailView"}
      title={siteNotificationData != null ? `Site Notification Details [${siteNotificationData["name"]}]` : undefined}
      managementViewLink={"/admin/site-notifications"}
      managementTitle={"Site Notification Management"}
      managementViewIcon={faTags}
      type={"Site Notification"}
      titleIcon={faTags}
      dataObject={siteNotificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<SiteNotificationDetailPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} />}
    />
  );
}

export default SiteNotificationDetailView;