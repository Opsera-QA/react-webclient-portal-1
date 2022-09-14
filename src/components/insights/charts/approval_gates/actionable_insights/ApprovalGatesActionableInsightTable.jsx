import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import ApprovalGatesInsightsTableMetadata from "./approval-gates-actionable-metadata";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields,"pipeline_name")),
      getTableTextColumn(getField(fields,"run_count")),
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
