import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import ApprovalGatesInsightsTableMetadata from "./approval-gates-actionable-metadata";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

function ApprovalGatesActionableInsightTable({
  metrics,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
}) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Approval Gates report is currently unavailable at this time";
  const fields = ApprovalGatesInsightsTableMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "count_of_approval_gates")),
      getTableDateTimeColumn(getField(fields, "last_run")),
      getTableTextColumn(getField(fields, "last_run_in_day")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?._id?.id} runCount={rowData?.original?._id?.run} />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        onRowSelect={onRowSelect}
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
};

export default ApprovalGatesActionableInsightTable;
