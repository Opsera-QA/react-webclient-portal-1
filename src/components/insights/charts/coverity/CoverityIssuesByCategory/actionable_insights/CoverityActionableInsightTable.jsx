import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import CoverityActionableMetadata from "./coverity-actionable-insight-metadata";
import {
  getChartTrendStatusColumn, getCustomTableAccessor, getCustomTableHeader, getTableDateTimeColumn,
  getTableTextColumn,
  getTableTextColumnWithoutField,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import { getFormattedTimestamp } from "../../../../../common/fields/date/DateFieldBase";

// TODO: Convert to cards
function CoverityActionableInsightTable({ data, isLoading, loadData, filterModel, setFilterModel, title }) {
  const toastContext = useContext(DialogToastContext);
  const fields = CoverityActionableMetadata.fields;
  const tableTitle = "Coverity " + title + " Report";
  const noDataMessage = "Coverity " + title + " report is currently unavailable at this time";

  const getCoverityTableTextColumn = (field, block) => {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      Cell: function parseText(row) {
        let classNm = "dark-gray-text-primary";
        const value = row?.value;
        switch (block) {
          case "total_issues":
            classNm = value <= 0 ? 'green' : "danger-red";
            break;
          case "quality_issues":
            classNm = value <= 0 ? 'green' : "danger-red";
            break;
          case "security_issues":
            classNm = value <= 0 ? 'green' : "danger-red";
            break;
          default:
            classNm = "dark-gray-text-primary";
        }

        return (<div className={`${classNm}`}>
          {value}
        </div>);
      },
    };
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project"), "project"),
      getTableTextColumn(getField(fields, "pipelineName"), "pipelineName"),
      getTableTextColumn(getField(fields, "run"), "run"),
      getTableDateTimeColumn(getField(fields, "timestamp"), "timestamp"),
      getChartTrendStatusColumn(getField(fields, "trend"), "trend"),
      getCoverityTableTextColumn(getField(fields, "total_issues"), "total_issues"),
      getCoverityTableTextColumn(getField(fields, "quality_issues"), "quality_issues"),
      getCoverityTableTextColumn(getField(fields, "security_issues"), "security_issues"),
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