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
import FilterBar from "../../common/filters/FilterBar";
import StatusFilter from "../../common/filters/status/StatusFilter";
import ToolIdentifierFilter from "../../common/filters/tools/ToolIdentifierFilter";

function ToolsTable({ data, toolFilterDto, setToolFilterDto, loadData, isLoading }) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);
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

  const getFilterBar = () => {
    return(
      <FilterBar loadData={loadData}>
        <StatusFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <ToolIdentifierFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
      </FilterBar>
    );
  };

  return (
    <>
      <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
      <div className="p-2">
        <div className="custom-table-filter d-flex flex-row-reverse">
          <div className="mb-1 text-right">
            <Button variant="primary" size="sm"
                    onClick={() => { createNewTool(); }}>
              <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool
            </Button>
            <br />
          </div>
        </div>
          <CustomTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            onRowSelect={onRowSelect}
            paginationDto={toolFilterDto}
            rowStyling={rowStyling}
            loadData={loadData}
            tableFilterBar={getFilterBar()}
            tableTitle={"Tools"}
          >
          </CustomTable>
      </div>
    </>
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  filterData: PropTypes.func,
  filterOptionList: PropTypes.array,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func
};

export default ToolsTable;