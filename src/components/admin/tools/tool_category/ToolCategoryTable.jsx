import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import toolCategoryMetadata from "components/admin/tools/tool_category/tool-category-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import {faToolbox} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewToolCategoryOverlay from "components/admin/tools/tool_category/NewToolCategoryOverlay";

function ToolCategoryTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = toolCategoryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/tools/types/details/${rowData.original._id}`);
  };

  const createToolType = () => {
    toastContext.showOverlayPanel(<NewToolCategoryOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getToolCategoryTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        rowStyling={rowStyling}
      />
    );
  };

  return (
    <FilterContainer
      className={"px-2 pb-2"}
      loadData={loadData}
      addRecordFunction={createToolType}
      isLoading={isLoading}
      body={getToolCategoryTable()}
      titleIcon={faToolbox}
      title={"Tool Categories"}
      type={"Tool Category"}
    />
  );
}

ToolCategoryTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object
};

export default ToolCategoryTable;