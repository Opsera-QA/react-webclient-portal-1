import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {faToolbox} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewToolCategoryOverlay from "components/admin/tools/categories/NewToolCategoryOverlay";
import {toolCategoryMetadata} from "components/admin/tools/categories/toolCategory.metadata";

function ToolCategoryTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = toolCategoryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );
 
  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const onRowSelect = (rowData) => {
    history.push(`/admin/tools/types/details/${rowData.original._id}`);
  };

  const createToolType = () => {
    toastContext.showOverlayPanel(
      <NewToolCategoryOverlay
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getToolCategoryTable = () => {
    return (
      <CustomTable
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