import React, { useMemo, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import {
  getTableBooleanIconColumn,
  getTableDateTimeColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationActivityLogMetadata
  from "components/notifications/notification_details/activity_logs/notification-activity-log-metadata";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import notificationsActions from "components/notifications/notifications-actions";
import Model from "core/data_model/model";
import notificationActivityLogFilterMetadata
  from "components/notifications/notification_details/activity_logs/notifications-activity-log-filter-metadata";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";

function NotificationActivityLogsTable({ notificationData, allLogs }) {
  let fields = notificationActivityLogMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notificationActivityFilterDto, setNotificationActivityFilterDto] = useState(new Model({...notificationActivityLogFilterMetadata.newObjectFields}, notificationActivityLogFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const initialState = {
    pageIndex: 0,
  };

  const showActivityLog = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableInfoIconColumn(showActivityLog),
    ],
    [],
  );

  const loadData = async (filterDto = notificationActivityFilterDto) => {
    try {
      let notificationLogResponse;

      setIsLoading(true);

      if(allLogs) {
        notificationLogResponse = await notificationsActions.getAllNotificationActivityLogs(filterDto, getAccessToken);
      } else {
        notificationLogResponse = await notificationsActions.getNotificationActivityLogs(notificationData, filterDto, getAccessToken);
      }
      
      if (notificationLogResponse?.data) {
        setLogData(notificationLogResponse.data.data);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", notificationLogResponse.data.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setNotificationActivityFilterDto({...newFilterDto});
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} className={"mb-2"} />
        <NotificationTypeFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} className={"mb-2"}/>
        <TagFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} />
      </>
    );
  };

  const getNotificationActivityLogsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        data={logData}
        initialState={initialState}
        isLoading={isLoading}
        paginationDto={notificationActivityFilterDto}
        setPaginationDto={setNotificationActivityFilterDto}
        loadData={loadData}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getNotificationActivityLogsTable()}
        filterDto={notificationActivityFilterDto}
        setFilterDto={setNotificationActivityFilterDto}
        supportSearch={true}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faTable}
        title={"Policy Activity Logs"}
      />
      <ModalActivityLogsDialog size={"lg"} header={"Policy Activity Log"} jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </div>
  );
}

NotificationActivityLogsTable.propTypes = {
  notificationData: PropTypes.object,
  allLogs : PropTypes.bool,
};

export default NotificationActivityLogsTable;
