import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getContactArrayColumn,
  getNameValueArrayColumn, getRoleArrayColumn,
  getStringifiedArrayColumn,
  getTableTextColumn, getTagArrayColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import toolMetadata from "components/inventory/tools/tool-metadata";

function DetailedToolReportTable({ data, isLoading }) {
  let fields = toolMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "owner_name")),
      getContactArrayColumn(getField(fields, "contacts"), "force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "applications"), "force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "location"),"force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "organization"),"force-text-wrap"),
      getStringifiedArrayColumn(getField(fields, "external_reference"),"force-text-wrap"),
      getTagArrayColumn(getField(fields, "tags"), "force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "licensing"),"force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "compliance"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "costCenter")),
      getTableTextColumn(getField(fields, "active")),
      getTableTextColumn(getField(fields, "status")),

    ],
    []
  );

  // const rowStyling = (row) => {
  //   return row["count"] === 0 ? " inactive-row" : "";
  // };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        // rowStyling={rowStyling}
        isLoading={isLoading}
        tableTitle={"Detailed Tool Report"}
        type={"Detailed Tool Report"}
      />
    </div>
  );
}

DetailedToolReportTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default DetailedToolReportTable;