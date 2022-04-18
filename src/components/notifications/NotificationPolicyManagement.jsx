import React, {useContext, useEffect, useRef, useState} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import notificationsFilterMetadata from "components/notifications/notifications-filter-metadata";
import notificationsActions from "components/notifications/notifications-actions";
import NotificationSubNavigationBar from "components/notifications/NotificationSubNavigationBar";
import NotificationsTable from "components/notifications/NotificationsTable";
import axios from "axios";
import NotificationManagementHelpDocumentation
  from "../common/help/documentation/notifications/NotificationManagementHelpDocumentation";

function NotificationPolicyManagement() {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationFilterModel, setNotificationFilterModel] = useState(new Model({...notificationsFilterMetadata.newObjectFields}, notificationsFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(notificationFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterModel = notificationFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getNotificationsList(newFilterModel, cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationsList = async (newFilterModel = notificationFilterModel, cancelSource = cancelTokenSource) => {
    const response = await notificationsActions.getNotificationsListV2(getAccessToken, cancelSource, newFilterModel);
    const notificationsList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(notificationsList)) {
      setNotificationsList(response?.data?.data);

      if (newFilterModel) {
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel.getActiveFilters());
        setNotificationFilterModel({...newFilterModel});
      }
    }
  };

  const getHelpComponent = () => {
    return (<NotificationManagementHelpDocumentation/>);
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"notificationManagement"}
      helpComponent={getHelpComponent()}
      pageDescription={`
        Create Notification Policies to tailor activity logging to your needs.
      `}
      navigationTabContainer={<NotificationSubNavigationBar activeTab={"notifications"} />}
    >
      <NotificationsTable
        isLoading={isLoading}
        loadData={loadData}
        data={notificationsList}
        notificationFilterDto={notificationFilterModel}
        setNotificationFilterDto={setNotificationFilterModel}
        isMounted={isMounted}
      />
    </ScreenContainer>
  );
}

export default NotificationPolicyManagement;