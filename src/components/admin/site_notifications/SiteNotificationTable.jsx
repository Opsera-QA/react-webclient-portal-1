import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotificationMetadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import NewSiteNotificationModal from "components/admin/site_notifications/NewSiteNotificationModal";
import {getField} from "components/common/metadata/metadata-helpers";

function SiteNotificationTable({ data, loadData, isLoading }) {
  const history = useHistory();
  let fields = siteNotificationMetadata.fields;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "header")),
      getTableTextColumn(getField(fields, "view")),
      getTableTextColumn(getField(fields, "message")),
      getTableDateColumn(getField(fields, "expiration")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/admin/site-notifications/details/" + rowData.original._id);
  };

  const initialState = {
    pageIndex: 0
  };

  const createSiteNotification = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        initialState={initialState}
        isLoading={isLoading}
        type={"Site Notification"}
        tableTitle={"Site Notifications"}
        createNewRecord={createSiteNotification}
        loadData={loadData}
      />
      <NewSiteNotificationModal showModal={showCreateModal} loadData={loadData} setShowModal={setShowCreateModal}/>
    </div>
  );
}

SiteNotificationTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SiteNotificationTable;