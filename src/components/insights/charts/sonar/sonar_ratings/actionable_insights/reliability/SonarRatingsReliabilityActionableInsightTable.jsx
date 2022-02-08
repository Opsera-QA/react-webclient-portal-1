import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SonarPipelineTableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar.pipeline.table.metadata";
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
import { LETTER_GRADES } from "../../../../../../common/metrics/grade/MetricLetterGradeText";
import { getTableTextColumn } from "../../../../../../common/table/column_definitions/model-table-column-definitions";

// TODO: Convert to cards
function SonarRatingsReliabilityActionableInsightTable(
  {
    bugsData,
    isLoading,
    filterModel,
    setFilterModel,
    loadData,
  }) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Sonar Bugs report is currently unavailable at this time";
  const fields = SonarPipelineTableMetadata.fields;

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

  const getKpiSonarRatingTableTextColumn = (field) => {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      Cell: function parseText(row) {
        const value = row?.value;
        if (value > 0) {
          if (value <= 1) {
            return LETTER_GRADES.A;
          } else if (value <= 2) {
            return LETTER_GRADES.B;
          } else if (value <= 3) {
            return LETTER_GRADES.C;
          } else if (value <= 4) {
            return LETTER_GRADES.D;
          } else if (value <= 5) {
            return LETTER_GRADES.E;
          } else {
            return null;
          }
        }
        return (
          <div>{value}</div>
        );
      },
    };
  };

  const columns = useMemo(
    () => [
      getKpiSonarPipelineTableTextColumn(getField(fields, "project")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "pipelineName")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "runCount")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "endTimestamp")),
      getKpiSonarRatingTableTextColumn(getField(fields, "reliability_rating")),
      getChartTrendStatusColumn(getField(fields, "status")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "critical"), "critical"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "blocker"), "blocker"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "major"), "major"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "minor"), "minor"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "info"), "info"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "effort")),
      getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={bugsData}
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
      title={`Bugs Report`}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      loadData={loadData}
    />
  );
}

SonarRatingsReliabilityActionableInsightTable.propTypes = {
  bugsData: PropTypes.array,
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
};

export default SonarRatingsReliabilityActionableInsightTable;
