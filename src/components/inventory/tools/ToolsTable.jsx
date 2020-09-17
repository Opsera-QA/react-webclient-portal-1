import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";
import toolMetadata from "./tool-metadata";
import {useHistory} from "react-router-dom";
import NewToolModal from "./NewToolModal";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {DropdownList} from "react-widgets";

function ToolsTable({ data, filterOptionList, loadData, isLoading }) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);
  const [tableFilter, setTableFilter] = useState();
  let history = useHistory();
  const fields = toolMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "tool_identifier"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const createNewTool = () => {
    setShowCreateToolModal(true);
  };

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };

  const updateFilterOption = (filterOption) => {
    setTableFilter(filterOption);
  };

  return (
    <>
      <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
      <div className="p-2">
        <div className="custom-table-filter d-flex flex-row-reverse">
          <div className="tool-filter mr-2 mb-1">
            { filterOptionList && <DropdownList
              busy={Object.keys(filterOptionList).length === 1}
              disabled={Object.keys(filterOptionList).length === 1}
              data={filterOptionList}
              valueField='filterText'
              textField='text'
              filter="contains"
              defaultValue={tableFilter}
              onChange={updateFilterOption}
            />}
          </div>
        </div>
        <div className="table-content-block">
          <CustomTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            onRowSelect={onRowSelect}
            rowStyling={rowStyling}
            tableFilter={tableFilter}
            tableTitle={"Tools"}
            type={"Tool"}
            createNewRecord={createNewTool}
          >
          </CustomTable>
        </div>
      </div>
    </>
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  filterOptionList: PropTypes.array
};

export default ToolsTable;