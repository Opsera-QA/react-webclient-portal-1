import React, {useMemo, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewSiteNotificationOverlay from "components/admin/site_notifications/NewSiteNotificationOverlay";
import {getField} from "components/common/metadata/metadata-helpers";

function SiteNotificationTable({ data, loadData, isLoading, isMounted, siteNotificationDataDto, setSiteNotificationDto }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = siteNotificationMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "header")),
      getTableTextColumn(getField(fields, "view")),
      getLimitedTableTextColumn(getField(fields, "message"), 100),
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
    toastContext.showOverlayPanel(<NewSiteNotificationOverlay loadData={loadData} isMounted={isMounted} />);
  };

  return (
      <CustomTable
        className="px-2 pb-2"
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        initialState={initialState}
        isLoading={isLoading}
        type={"Site Notification"}
        tableTitle={"Site Notifications"}
        createNewRecord={createSiteNotification}
        loadData={loadData}
        paginationDto={siteNotificationDataDto}
        setPaginationDto={setSiteNotificationDto}
      />
  );
}

SiteNotificationTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  siteNotificationDataDto: PropTypes.object,
  setSiteNotificationDto: PropTypes.func
};

export default SiteNotificationTable;