import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import axios from "axios";
import NotificationActivityLogsTable
from "components/notifications/activity_logs/NotificationActivityLogsTable";
import PropTypes from "prop-types";
import notificationsActions from "components/notifications/notifications-actions";
import notificationActivityLogFilterMetadata
from "components/notifications/activity_logs/notifications-activity-log-filter-metadata";

function NotificationPolicyActivityLogs({notificationId}) {
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
    const response = await notificationsActions.getNotificationActivityLogsV2(getAccessToken, cancelSource, notificationId, filterDto);
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
    <NotificationActivityLogsTable
      isLoading={isLoading}
      loadData={loadData}
      notificationActivityFilterDto={notificationActivityFilterDto}
      notificationActivityLogs={notificationActivityLogs}
      setNotificationActivityFilterDto={setNotificationActivityFilterDto}
    />
  );
}

NotificationPolicyActivityLogs.propTypes = {
  notificationId: PropTypes.string,
};

export default NotificationPolicyActivityLogs;