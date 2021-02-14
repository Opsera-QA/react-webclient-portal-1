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
import LdapOwnerFilter from "components/common/filters/pipelines/LdapOwnerFilter";
import ToolIdentifierFilter from "components/common/filters/tools/ToolIdentifierFilter";
import TagFilter from "components/common/filters/tags/TagFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags, faTools} from "@fortawesome/pro-light-svg-icons";

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

  const getDropdownFilters = () => {
    return(
      <>
        <StatusFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} className={"mb-2"} />
        <TagTypeFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
      </>
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