import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SonarCoverageTableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-rating-coverage-actionable-metadata";
import {
  getChartTrendStatusColumn,
  getTableTextColumnWithoutField,
  getCustomTableHeader, getCustomTableAccessor,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

// TODO: Convert to cards
function SonarRatingCodeCoverageActionableInsightTable(
  {
    coverageData,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
  }) {
  console.log("cover", coverageData);
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Sonar Code Coverage report is currently unavailable at this time";
  const fields = SonarCoverageTableMetadata.fields;

  // TODO: Handle colors with rules after written
  const getKpiSonarPipelineTableTextColumn = (field, block) => {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      Cell: function parseText(row) {
        let classNm = "dark-gray-text-primary";
        const value = row?.value;
        if (value > 0) {
          switch (block) {
            case "vulnerability":
            case "bugs":
            case "code_smells":
            case "critical":
            case "blocker":
              classNm = 'danger-red';
              break;
            case "major":
              classNm = value <= 1 ? 'opsera-yellow' : "danger-red";
              break;
            case "minor":
              classNm = value < 10 ? 'opsera-yellow' : "danger-red";
              break;
            default:
              classNm = "dark-gray-text-primary";
          }
        }
        return (<div className={`${classNm}`}>
          {value}
        </div>);
      },
    };
  };

  const columns = useMemo(
    () => [
      getKpiSonarPipelineTableTextColumn(getField(fields, "_id")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "pipelineName")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "runCount")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "timestamp")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "duplicate_lines")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "duplicated_lines_density")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "coverage")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "lines_to_cover")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "uncovered_lines")),
      getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount}/>
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={coverageData}
        noDataMessage={noDataMessage}
        onRowSelect={onRowSelect}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      showBorder={false}
      title={`Code Coverage Metrics Report`}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
    />
  );
}

SonarRatingCodeCoverageActionableInsightTable.propTypes = {
  coverageData: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};

export default SonarRatingCodeCoverageActionableInsightTable;
