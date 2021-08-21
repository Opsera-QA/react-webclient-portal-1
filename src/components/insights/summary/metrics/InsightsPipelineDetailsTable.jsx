import React, {useMemo, useContext} from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import VanityTable from 'components/common/table/VanityTable';

function InsightsPipelineDetailsTable({ tableTitle, data, loadData, tableFilterDto, setTableFilterDto, isLoading }) {
  const fields = BuildDetailsMetadata.fields;
  let toastContext = useContext(DialogToastContext);

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "run_count")),
      getChartPipelineStatusColumn(getField(fields, "status")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
    ],
    []
  );

  const onRowSelect = (grid, row) => {
    toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={row._id.id} runCount={row.run_count} />);
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
        loadData={loadData}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      title={tableTitle}
      body={getTable()}
      isLoading={isLoading}
      titleIcon={faDraftingCompass}
      className={"p-4"}
    />
  );
}

InsightsPipelineDetailsTable.propTypes = {
  tableTitle: PropTypes.string,
  loadData: PropTypes.func,
  data: PropTypes.array,
  tableFilterDto: PropTypes.object,
  setTableFilterDto: PropTypes.func,
  isLoading: PropTypes.bool
};

export default InsightsPipelineDetailsTable;
