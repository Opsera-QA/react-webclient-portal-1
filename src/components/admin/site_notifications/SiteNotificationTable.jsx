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
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

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
    history.push("/admin/site-notifications/details/" + rowData?.original?._id);
  };

  const initialState = {
    pageIndex: 0
  };

  const createSiteNotification = () => {
    toastContext.showOverlayPanel(<NewSiteNotificationOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getSiteNotificationTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        initialState={initialState}
        isLoading={isLoading}
        paginationDto={siteNotificationDataDto}
        setPaginationDto={setSiteNotificationDto}
      />
    );
  };

  return (
    <FilterContainer
      className={"m-2"}
      showBorder={false}
      body={getSiteNotificationTable()}
      metadata={siteNotificationMetadata}
      titleIcon={faFlag}
      addRecordFunction={createSiteNotification}
      loadData={loadData}
      title={"Site Notifications"}
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