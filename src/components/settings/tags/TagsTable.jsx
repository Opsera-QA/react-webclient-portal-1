import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import tagEditorMetadata from "./tags-form-fields";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";
import NewTagModal from "./NewTagModal";
import FilterBar from "../../common/filters/FilterBar";
import StatusFilter from "../../common/filters/status/StatusFilter";
import TagTypeFilter from "../../common/filters/tags/TagTypeFilter";
import SearchFilter from "../../common/filters/search/StatusFilter";
import {getField} from "../../common/metadata/metadata-helpers";

function TagsTable({ data, loadData, isLoading, tagFilterDto, activeTagFilterDto, setTagFilterDto }) {
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

  const initialState = {
    pageIndex: 0
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
        activeFilterDto={activeTagFilterDto}
      >
        <StatusFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
        <TagTypeFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
        <SearchFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div>
      <CustomTable onRowSelect={onRowSelect}
                   data={data}
                   rowStyling={rowStyling}
                   columns={columns}
                   initialState={initialState}
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