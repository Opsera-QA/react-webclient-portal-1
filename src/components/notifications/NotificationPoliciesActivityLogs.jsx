import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import notificationsActions from "./notifications-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NotificationSubNavigationBar from "components/notifications/NotificationSubNavigationBar";
import axios from "axios";
import NotificationActivityLogsTable
  from "components/notifications/notification_details/activity_logs/NotificationActivityLogsTable";
import notificationActivityLogFilterMetadata
  from "components/notifications/notification_details/activity_logs/notifications-activity-log-filter-metadata";

function NotificationPoliciesActivityLogs() {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationActivityLogs, setNotificationActivityLogs] = useState([]);
  const [notificationActivityFilterDto, setNotificationActivityFilterDto] = useState(new Model({...notificationActivityLogFilterMetadata.newObjectFields}, notificationActivityLogFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterDto = notificationActivityFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getNotificationsList(newFilterDto, cancelSource);
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationsList = async (filterDto = notificationActivityFilterDto, cancelSource = cancelTokenSource) => {
    const response = await notificationsActions.getAllNotificationActivityLogsV2(getAccessToken, cancelSource, filterDto);
    const notificationsList = response?.data?.data;

    if (Array.isArray(notificationsList)) {
      setNotificationActivityLogs(response?.data?.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setNotificationActivityFilterDto({...newFilterDto});
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"notificationActivityLogs"}
      pageDescription={`View Notification Activity Logs`}
      navigationTabContainer={<NotificationSubNavigationBar activeTab={"activity"} />}
    >
      <NotificationActivityLogsTable
        isLoading={isLoading}
        loadData={loadData}
        notificationActivityFilterDto={notificationActivityFilterDto}
        notificationActivityLogs={notificationActivityLogs}
        setNotificationActivityFilterDto={setNotificationActivityFilterDto}
      />
    </ScreenContainer>
  );
}

export default NotificationPoliciesActivityLogs;