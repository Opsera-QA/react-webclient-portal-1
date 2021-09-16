import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./notifications.css";
import NotificationsTable from "./NotificationsTable";
import notificationsFilterMetadata from "./notifications-filter-metadata";
import notificationsActions from "./notifications-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import FilterContainer from "components/common/table/FilterContainer";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import NewNotificationOverlay from "components/notifications/NewNotificationOverlay";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineNotificationTypeFilter
  from "components/common/filters/notifications/notification_type/InlineNotificationTypeFilter";

function NotificationsView({isMounted}) {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationFilterDto, setNotificationFilterDto] = useState(new Model({...notificationsFilterMetadata.newObjectFields}, notificationsFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (newFilterDto = notificationFilterDto) => {
    try {
      setIsLoading(true);
      const userRoleAccess = await getRoles();

      if (userRoleAccess) {
        setAccessRoleData(userRoleAccess);
        await loadNotifications(newFilterDto);
      }
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotifications = async (filterDto = notificationFilterDto) => {
    await getNotificationsList(filterDto);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    return await setAccessRoles(user);
  };

  const getNotificationsList = async (filterDto = notificationFilterDto) => {
      const response = await notificationsActions.getNotificationsList(filterDto, getAccessToken);
      setNotificationsList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setNotificationFilterDto({...newFilterDto});
  };

  const getNotificationTable = () => {
    return (
      <NotificationsTable
        isLoading={isLoading}
        loadData={loadData}
        data={notificationsList}
        notificationFilterDto={notificationFilterDto}
        setNotificationFilterDto={setNotificationFilterDto}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} className="mb-2" />
        <NotificationTypeFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} className="mb-2" />
        <TagFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} />
      </>
    );
  };

  const getInlineFilters = () => {
    return <InlineNotificationTypeFilter filterModel={notificationFilterDto} setFilterModel={setNotificationFilterDto} loadData={loadData} className={"mr-2"}/>;
  };

  const createNewNotification = () => {
   toastContext.showOverlayPanel(<NewNotificationOverlay loadData={loadData} isMounted={isMounted} />);
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <FilterContainer
      className="px-2 pb-2"
      loadData={loadData}
      filterDto={notificationFilterDto}
      setFilterDto={setNotificationFilterDto}
      addRecordFunction={createNewNotification}
      inlineFilters={getInlineFilters()}
      supportSearch={true}
      isLoading={isLoading}
      body={getNotificationTable()}
      dropdownFilters={getDropdownFilters()}
      titleIcon={faFlag}
      title={"Notification Policies"}
    />
  );
}

NotificationsView.propTypes ={
isMounted: PropTypes.object,
};
export default NotificationsView;