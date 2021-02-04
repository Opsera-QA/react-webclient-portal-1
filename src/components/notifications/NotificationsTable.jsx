import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationsMetadata from "./notifications-metadata";
import {useHistory} from "react-router-dom";
import NewNotificationModal from "./NewNotificationModal";
import FilterBar from "components/common/filters/FilterBar";
import StatusFilter from "components/common/filters/status/StatusFilter";
import TagFilter from "components/common/filters/tags/TagFilter";
import SearchFilter from "components/common/filters/search/SearchFilter";
import NotificationTypeFilter from "components/common/filters/notifications/NotificationTypeFilter";

function NotificationsTable({ data, notificationFilterDto, setNotificationFilterDto, loadData, isLoading }) {
  const [showCreateNotificationModal, setShowCreateNotificationModal] = useState(false);
  let history = useHistory();
  const fields = notificationsMetadata.fields;

  const tableInitialState = {
    pageIndex: 0,
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const createNewNotification = () => {
    setShowCreateNotificationModal(true);
  };

  const onRowSelect = (rowData) => {
    history.push(`/notifications/details/${rowData.original._id}`);
  };

  const getFilterBar = () => {
    if (notificationFilterDto == null) {
      return null;
    }

    return(
      <FilterBar loadData={loadData}
                 filterDto={notificationFilterDto}
                 setFilterDto={setNotificationFilterDto}
                 filters={["status", "type", "tag", "search"]}
                 addRecordFunction={createNewNotification}
                 supportSearch={true}
      >
        <StatusFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} />
        <NotificationTypeFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} />
        <TagFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        paginationDto={notificationFilterDto}
        setPaginationDto={setNotificationFilterDto}
        rowStyling={rowStyling}
        loadData={loadData}
        tableFilterBar={getFilterBar()}
        tableTitle={"Notification Policies"}
        initialState={tableInitialState}
      />
      <NewNotificationModal loadData={loadData} setShowModal={setShowCreateNotificationModal} showModal={showCreateNotificationModal}/>
    </div>
  );
}

NotificationsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  notificationFilterDto: PropTypes.object,
  setNotificationFilterDto: PropTypes.func,
};

export default NotificationsTable;