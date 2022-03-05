import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {getTableBooleanIconColumn, getTableDateColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";
import VanityTable from "components/common/table/VanityTable";

function UserToolOwnershipReportTable({ toolList, isLoading, paginationModel, setPaginationModel, loadData }) {
  const fields = toolMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "description"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "tool_type_identifier")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (grid, row) => {
    history.push(`/inventory/tools/details/${row?._id}`);
  };

  const getToolTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        data={toolList}
        loadData={loadData}
        noDataMessage={getNoDataMessage()}
        columns={columns}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();

    if (!paginationModel?.getFilterValue("owner")) {
      return "Please select a user to get started";
    }

    if (activeFilters && activeFilters.length > 1) {
      return "No tools meeting the filter requirements were found.";
    }

    return "No tools are owned by this user account.";
  };

  return (
    <FilterContainer
      style={{minWidth: "505px"}}
      className={"px-2 pb-2"}
      loadData={loadData}
      filterDto={paginationModel}
      setFilterDto={setPaginationModel}
      supportSearch={true}
      isLoading={isLoading}
      metadata={toolMetadata}
      body={getToolTable()}
      titleIcon={faTools}
      title={"Tools"}
    />
  );
}

UserToolOwnershipReportTable.propTypes = {
  toolList: PropTypes.array,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default UserToolOwnershipReportTable;
