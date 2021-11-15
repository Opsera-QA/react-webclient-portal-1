import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import SiteNotificationDetailPanel
  from "components/admin/site_notifications/details/SiteNotificationDetailPanel";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import Model from "core/data_model/model";
import axios from "axios";

function SiteNotificationDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [siteNotificationData, setSiteNotificationData] = useState(undefined);
  const { id } = useParams();
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
  },[]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSiteNotification = async (cancelSource = cancelTokenSource) => {
    const response = await siteNotificationActions.getSiteNotificationV2(id, getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setSiteNotificationData(new Model(response.data, siteNotificationMetadata, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess) && id) {
        await getSiteNotification(cancelSource);
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
          {meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, accessRoleData) && (
            <ActionBarDeleteButton2 dataObject={siteNotificationData} relocationPath={"/admin/site-notifications"} handleDelete={handleDelete}/>
          )}
          </div>
        </ActionBarContainer>
      );
    }
  };

  const handleDelete = async () => {
    return await siteNotificationActions.deleteSiteNotification(siteNotificationData, getAccessToken);
  };

  return (
    <DetailScreenContainer
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      breadcrumbDestination={"siteNotificationDetailView"}
      accessRoleData={accessRoleData}
      metadata={siteNotificationMetadata}
      dataObject={siteNotificationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<SiteNotificationDetailPanel setSiteNotificationData={setSiteNotificationData} siteNotificationData={siteNotificationData} accessRoleData={accessRoleData} />}
    />
  );
}

export default SiteNotificationDetailView;