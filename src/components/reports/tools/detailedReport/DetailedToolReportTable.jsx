import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getLimitedContactArrayColumn,
  getNameValueArrayColumn,
  getLimitedStringifiedArrayColumn,
  getTableTextColumn, 
  getLimitedTagArrayColumn,
  getTableBooleanIconColumn,
  getLimitedTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import toolMetadata from "components/inventory/tools/tool-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import ExportDetailedToolReportButton from 'components/common/buttons/export/reports/ExportDetailedToolReportButton';


function DetailedToolReportTable({ data, loadData, isLoading }) {
  const history = useHistory();
  let fields = toolMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_name"),"no-wrap-inline pr-4"),
      getLimitedTableTextColumn(getField(fields, "description"),60,"no-wrap-inline"),
      getLimitedContactArrayColumn(getField(fields, "contacts"),25, "no-wrap-inline"),
      getNameValueArrayColumn(getField(fields, "applications"), "force-text-wrap"),
      getNameValueArrayColumn(getField(fields, "location"),"no-wrap-inline"),
      getNameValueArrayColumn(getField(fields, "organization"),"no-wrap-inline"),
      getLimitedTagArrayColumn(getField(fields, "tags"), 60, "no-wrap-inline"),
      getLimitedStringifiedArrayColumn(getField(fields, "external_reference"), 50),
      getNameValueArrayColumn(getField(fields, "licensing"),"no-wrap-inline"),
      getNameValueArrayColumn(getField(fields, "compliance"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "costCenter")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  console.log(data);

  const onRowSelect = (rowData) => {
    history.push("/inventory/tools/details/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return row["count"] === 0 ? " inactive-row" : "";
  };

const getDetailedToolReportTable = () => {
  return (
      <CustomTable
        className="table-no-border"
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
      />
  );
};

return (
  <FilterContainer
    loadData={loadData}
    supportSearch={false}
    isLoading={isLoading}
    body={getDetailedToolReportTable()}
    metadata={toolMetadata}
    titleIcon={faTools}
    title={"Tools"}
    className={"px-2 pb-2"}
    exportButton={<ExportDetailedToolReportButton className={"ml-2"} isLoading={isLoading} toolData={data} />}
  />
);
 
}

DetailedToolReportTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

export default DetailedToolReportTable;