import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import ApprovalgatesTotalPipelinesMetadata from "./approval-gates-total-pipelines-metadata";

function ApprovalGatesActionableInsightTotalPipelinesTable({
  metrics,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  onRowSelect
}) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Approval Gates report is currently unavailable at this time";
  const fields = ApprovalgatesTotalPipelinesMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields,"slack")),
      getTableTextColumn(getField(fields,"teams")),
      getTableTextColumn(getField(fields,"email")),
      getTableTextColumn(getField(fields,"jira")),
      getTableTextColumn(getField(fields,"servicenow")),
      getTableTextColumn(getField(fields,"count_of_approval_gates")),
      getTableTextColumn(getField(fields,"pipeline_name")),
      getTableDateTimeColumn(getField(fields,"last_run")),
      getTableTextColumn(getField(fields,"last_run_in_days"))
    ],
    []
  );

  const onSelect=(rowData)=>{
    onRowSelect(rowData.original?._id);
  };
  

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        onRowSelect={onSelect}
        loadData={loadData}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      showBorder={false}
      title={`Approval Gates Report`}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
    />
  );
}

ApprovalGatesActionableInsightTotalPipelinesTable.propTypes = {
  metrics: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  onRowSelect: PropTypes.func,
};

export default ApprovalGatesActionableInsightTotalPipelinesTable;
