import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {getPipelineTypeColumn, getTableDateColumn, getTablePipelineStatusColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";
import CustomTable from "components/common/table/CustomTable";

function UserPipelineOwnershipReport({ pipelineList, isLoading, paginationModel, setPaginationModel, loadData }) {
  const fields = pipelineMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getPipelineTypeColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "name")),
      getTablePipelineStatusColumn(getField(fields, "workflow")),
      getTableTextColumn(getField(fields, "workflow.run_count")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateColumn(getField(fields, "updatedAt")),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const getPipelinesTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        paginationDto={paginationModel}
        setPaginationDto={setPaginationModel}
        data={pipelineList}
        columns={columns}
        loadData={loadData}
        onRowSelect={onRowSelect}
        noDataMessage={getNoDataMessage()}
      />
    );
  };

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();

    if (!paginationModel?.getFilterValue("owner")) {
      return "Please select a user to get started";
    }

    if (activeFilters && activeFilters.length > 1) {
      return "No pipelines meeting the filter requirements were found.";
    }

    return "No pipelines are owned by this user account.";
  };

  return (
    <FilterContainer
      className={"px-2 pb-2"}
      loadData={loadData}
      filterDto={paginationModel}
      setFilterDto={setPaginationModel}
      supportSearch={true}
      isLoading={isLoading}
      metadata={pipelineMetadata}
      type={"Pipeline"}
      body={getPipelinesTable()}
      titleIcon={faDraftingCompass}
      title={"Pipelines"}
    />
  );
}

UserPipelineOwnershipReport.propTypes = {
  pipelineList: PropTypes.array,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default UserPipelineOwnershipReport;
