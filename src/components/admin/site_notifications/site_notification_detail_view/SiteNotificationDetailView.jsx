import React, { useState, useEffect, useContext } from "react";
import SiteNotificationDetailPanel from "./SiteNotificationDetailPanel";
import { useParams } from "react-router-dom";
import siteNotificationActions from "../site-notification-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import siteNotificationMetadata from "../siteNotificationMetadata";
import ActionBarDeleteButton2 from "../../../common/actions/buttons/ActionBarDeleteButton2";

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
      title={siteNotificationData != null ? `Site Notification Details [${siteNotificationData["header"]}]` : undefined}
      managementViewLink={"/admin/site-notifications"}
      managementTitle={"Site Notification Management"}
      managementViewIcon={faFlag}
      type={"Site Notification"}
      titleIcon={faFlag}
      dataObject={siteNotificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<SiteNotificationDetailPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} />}
    />
  );
}

export default SiteNotificationDetailView;