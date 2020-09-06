import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import tagEditorMetadata from "./tags-form-fields";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";

function TagsTable({ data, isLoading }) {
  const history = useHistory();
  let fields = tagEditorMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableTextColumn(fields.find(field => { return field.id === "value"})),
      getTableTextColumn(fields.find(field => { return field.id === "account"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/settings/tags/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "type",
        desc: false
      }
    ]
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable onRowSelect={onRowSelect}
                     data={data}
                     rowStyling={rowStyling}
                     columns={columns}
                     initialState={initialState}
                     isLoading={isLoading}
                     tableStyleName={"custom-table-2"}
        />
      </div>
    </>
  );
}

TagsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default TagsTable;