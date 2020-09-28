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
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import FilterBar from "../../common/filters/FilterBar";
import StatusFilter from "../../common/filters/status/StatusFilter";
import TagTypeFilter from "../../common/filters/tags/TagTypeFilter";
import SortFilter from "../../common/filters/sort/SortFilter";

function TagsTable({ data, loadData, isLoading, tagFilterDto, setTagFilterDto, resetFilters }) {
  const history = useHistory();
  let fields = tagEditorMetadata.fields;
  const [showTagModal, setShowTagModal] = useState(false);
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
    pageIndex: 0
  };

  const createTag = () => {
    setShowTagModal(true);
  };

  const getFilterBar = () => {
    return(
      <FilterBar loadData={loadData} filterDto={tagFilterDto}>
        <StatusFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
        <TagTypeFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
        <SortFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div className="p-2">
      <div className="custom-table-filter d-flex flex-row-reverse">
        <div className="mb-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    createTag();
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tag
          </Button>
          <br/>
        </div>
      </div>
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
  setTagFilterDto: PropTypes.func,
};

export default TagsTable;