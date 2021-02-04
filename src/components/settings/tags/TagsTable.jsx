import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterBar from "components/common/filters/FilterBar";
import NewTagModal from "components/settings/tags/NewTagModal";
import StatusFilter from "components/common/filters/status/StatusFilter";
import TagTypeFilter from "components/common/filters/tags/TagTypeFilter";

function TagsTable({ data, loadData, isLoading, tagFilterDto, setTagFilterDto }) {
  const history = useHistory();
  let fields = tagEditorMetadata.fields;
  const [showTagModal, setShowTagModal] = useState(false);
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "value")),
      getTableTextColumn(getField(fields, "account")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableDateColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/settings/tags/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createTag = () => {
    setShowTagModal(true);
  };

  const getFilterBar = () => {
    return(
      <FilterBar
        addRecordFunction={createTag}
        loadData={loadData}
        filterDto={tagFilterDto}
        setFilterDto={setTagFilterDto}
        filters={["status", "type", "search"]}
        supportSearch={true}
      >
        <StatusFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
        <TagTypeFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        isLoading={isLoading}
        tableTitle={"Tags"}
        loadData={loadData}
        tableFilterBar={getFilterBar()}
        paginationDto={tagFilterDto}
        setPaginationDto={setTagFilterDto}
      />
      <NewTagModal showModal={showTagModal} loadData={loadData} setShowModal={setShowTagModal}/>
    </div>
  );
}

TagsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagFilterDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
};

export default TagsTable;