import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import NewToolCategoryModal from "components/admin/tools/tool_category/NewToolCategoryModal";
import toolCategoryMetadata from "components/admin/tools/tool_category/tool-category-metadata";

function ToolCategoryTable({ data, loadData, isLoading }) {
  const [showCreateToolCategoryModal, setShowCreateToolCategoryModal] = useState(false);
  const history = useHistory();
  let fields = toolCategoryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/tools/types/details/${rowData.original._id}`);
  };

  const createToolType = () => {
    setShowCreateToolCategoryModal(true);
  };

  return (
    <div>
        <CustomTable
          columns={columns}
          data={data}
          rowStyling={rowStyling}
          onRowSelect={selectedRow}
          isLoading={isLoading}
          tableTitle={`Tool Categories`}
          type={toolCategoryMetadata.type}
          createNewRecord={createToolType}
        />
      <NewToolCategoryModal setShowModal={setShowCreateToolCategoryModal} showModal={showCreateToolCategoryModal} loadData={loadData}/>
    </div>
  );
}

ToolCategoryTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ToolCategoryTable;