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
import NewTagModal from "components/settings/tags/NewTagModal";
import StatusFilter from "components/common/filters/status/StatusFilter";
import TagTypeFilter from "components/common/filters/tags/tag_type/TagTypeFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import InlineTagTypeFilter from "components/common/filters/tags/tag_type/InlineTagTypeFilter";

function TagsTable({ data, loadData, isLoading, tagFilterDto, setTagFilterDto }) {
  const history = useHistory();
  let fields = tagEditorMetadata.fields;
  const [showTagModal, setShowTagModal] = useState(false);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "value")),
      getTableTextColumn(getField(fields, "_id")),
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

  const getDropdownFilters = () => {
    return (
        <StatusFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineTagTypeFilter filterModel={tagFilterDto} setFilterModel={setTagFilterDto} loadData={loadData} className={"mr-2"} />
    );
  };

  const getTagsTable = () => {
    return (
      <CustomTable
        className="table-no-border"
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        paginationDto={tagFilterDto}
        setPaginationDto={setTagFilterDto}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        filterDto={tagFilterDto}
        setFilterDto={setTagFilterDto}
        addRecordFunction={createTag}
        supportSearch={true}
        isLoading={isLoading}
        body={getTagsTable()}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faTags}
        title={"Tags"}
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