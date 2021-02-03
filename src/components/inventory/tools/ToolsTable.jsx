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
import FilterBar from "../../common/filters/FilterBar";
import StatusFilter from "../../common/filters/status/StatusFilter";
import ToolIdentifierFilter from "../../common/filters/tools/ToolIdentifierFilter";
import TagFilter from "../../common/filters/tags/TagFilter";
import workflowAuthorizedActions from "../../workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ToolsTable({ data, toolFilterDto, setToolFilterDto, loadData, isLoading, customerAccessRules }) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);
  let history = useHistory();
  const fields = toolMetadata.fields;

  const tableInitialState = {
    pageIndex: 0,
  };

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

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  const createNewTool = () => {
    setShowCreateToolModal(true);
  };

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };

  const getFilterBar = () => {
    if (toolFilterDto == null) {
      return null;
    }

    return(
      <FilterBar loadData={loadData}
                 filterDto={toolFilterDto}
                 setFilterDto={setToolFilterDto}
                 filters={["status", "toolIdentifier", "tag", "search"]}
                 addRecordFunction={authorizedAction("create_tool") ? createNewTool : null}
                 supportSearch={true}
      >
        <StatusFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <ToolIdentifierFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <TagFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div className="p-2">
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        paginationDto={toolFilterDto}
        setPaginationDto={setToolFilterDto}
        rowStyling={rowStyling}
        loadData={loadData}
        tableFilterBar={getFilterBar()}
        tableTitle={"Tools"}
        initialState={tableInitialState}
      />
      <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
    </div>
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  activeToolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  customerAccessRules: PropTypes.object,
};

export default ToolsTable;