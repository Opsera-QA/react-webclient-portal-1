import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import NewToolIdentifierModal from "./NewToolIdentifierModal";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";

function ToolIdentifierTable({data, loadData, isLoading}) {
  const [showCreateToolIdentifierModal, setShowCreateToolIdentifierModal] = useState(false);
  const history = useHistory();
  let fields = toolIdentifierMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableBooleanIconColumn(getField(fields, "enabledInRegistry")),
    ],
    []
  );

  const noDataMessage = "No tool identifiers are currently registered";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createToolIdentifier = () => {
    setShowCreateToolIdentifierModal(true);
  };

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/tools/identifiers/details/${rowData.original._id}`);
  };

  const getToolIdentifierTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createToolIdentifier}
        isLoading={isLoading}
        body={getToolIdentifierTable()}
        titleIcon={faTools}
        title={"Tool Identifiers"}
        type={"Tool Identifier"}
      />
      <NewToolIdentifierModal setShowModal={setShowCreateToolIdentifierModal} loadData={loadData} showModal={showCreateToolIdentifierModal}/>
    </div>
  );
}

ToolIdentifierTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default ToolIdentifierTable;