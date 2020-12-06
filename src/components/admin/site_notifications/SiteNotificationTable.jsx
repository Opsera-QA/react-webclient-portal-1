import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";
import NewSiteNotificationModal from "./NewSiteNotificationModal";
import {getField} from "../../common/metadata/metadata-helpers";
import siteNotificationMetadata from "./siteNotificationMetadata";

function SiteNotificationTable({ data, loadData, isLoading }) {
  const history = useHistory();
  let fields = siteNotificationMetadata.fields;
  const [showBannerModal, setShowBannerModal] = useState(false);
  const columns = useMemo(
    () => [
      // getTableTextColumn(getField(fields, "type")),
      // getTableBooleanIconColumn(getField(fields, "active")),
      // getTableDateColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/admin/banners/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const initialState = {
    pageIndex: 0
  };

  const createBanner = () => {
    setShowBannerModal(true);
  };

  return (
    <div>
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        initialState={initialState}
        isLoading={isLoading}
        tableTitle={"Banners"}
        createNewRecord={createBanner}
        loadData={loadData}
      />
      <NewSiteNotificationModal showModal={showBannerModal} loadData={loadData} setShowModal={setShowBannerModal}/>
    </div>
  );
}

SiteNotificationTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SiteNotificationTable;