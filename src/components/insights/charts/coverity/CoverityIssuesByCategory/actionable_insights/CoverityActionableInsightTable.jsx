import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import CoverityActionableMetadata from "./coverity-actionable-insight-metadata";
import {
  getChartTrendStatusColumn,
  getTableTextColumn,
  getTableTextColumnWithoutField,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

// TODO: Convert to cards
function CoverityActionableInsightTable({ data, isLoading, loadData, filterModel, setFilterModel, title }) {
  const toastContext = useContext(DialogToastContext);
  const fields = CoverityActionableMetadata.fields;
  const tableTitle = "Coverity " + title + " Report";
  const noDataMessage = "Coverity " + title + " report is currently unavailable at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project"), "project"),
      getTableTextColumn(getField(fields, "run"), "run"),
      getChartTrendStatusColumn(getField(fields, "trend"), "trend"),
      getTableTextColumn(getField(fields, "total_issues"), "total_issues"),
      getTableTextColumn(getField(fields, "quality_issues"), "quality_issues"),
      getTableTextColumn(getField(fields, "security_issues"), "security_issues"),
      getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay
        pipelineId={rowData?.original?.pipeline}
        runCount={rowData?.original?.run}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      showBorder={false}
      title={tableTitle}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
    />
  );
}

CoverityActionableInsightTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  title: PropTypes.string,
};

export default CoverityActionableInsightTable;
