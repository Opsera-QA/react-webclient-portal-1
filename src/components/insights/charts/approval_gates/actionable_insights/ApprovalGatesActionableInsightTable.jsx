import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import ApprovalGatesInsightsTableMetadata from "./approval-gates-actionable-metadata";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";

function ApprovalGatesActionableInsightTable({
  metrics,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  onRowSelect
}) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Approval Gates report is currently unavailable at this time";
  const fields = ApprovalGatesInsightsTableMetadata.fields;
  const columns = useMemo(
    () => [
      getTableDateTimeColumn(getField(fields,"previous_step_start_time")),
      getTableTextColumn(getField(fields,"run_count")),
      getTableDateTimeColumn(getField(fields,"run_start_time")),
      getTableDateTimeColumn(getField(fields,"run_end_time")),
      getTableTextColumn(getField(fields,"step_index")),
      getTableTextColumn(getField(fields,"pipeline_name")),
      getTableTextColumn(getField(fields,"time_for_approval_in_dhms"))
    ],
    []
  );

  
  const onSelect=(rowData)=>{
    onRowSelect(rowData.original?.pipeline_id);
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

ApprovalGatesActionableInsightTable.propTypes = {
  metrics: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  onRowSelect: PropTypes.func,
};

export default ApprovalGatesActionableInsightTable;
