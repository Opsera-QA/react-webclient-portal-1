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

function NotificationPolicyManagement() {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationFilterDto, setNotificationFilterDto] = useState(new Model({...notificationsFilterMetadata.newObjectFields}, notificationsFilterMetadata, false));
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

  const loadData = async (newFilterDto = notificationFilterDto) => {
    try {
      setIsLoading(true);
      await getNotificationsList(newFilterDto);
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationsList = async (filterDto = notificationFilterDto) => {
    // TODO: Update to use cancel token
    const response = await notificationsActions.getNotificationsList(filterDto, getAccessToken);
    const notificationsList = response?.data?.data;

    if (Array.isArray(notificationsList)) {
      setNotificationsList(response?.data?.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setNotificationFilterDto({...newFilterDto});
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"notificationManagement"}
      pageDescription={`
        Create Notification Policies to tailor activity logging to your needs.
      `}
      navigationTabContainer={<NotificationSubNavigationBar activeTab={"notifications"} />}
    >
      <NotificationsTable
        isLoading={isLoading}
        loadData={loadData}
        data={notificationsList}
        notificationFilterDto={notificationFilterDto}
        setNotificationFilterDto={setNotificationFilterDto}
        isMounted={isMounted}
      />
    </ScreenContainer>
  );
}

export default NotificationPolicyManagement;