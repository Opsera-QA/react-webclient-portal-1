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
import { useHistory } from "react-router-dom";

// TODO: Convert to cards
function SonarRatingsMaintainabilityActionableInsightTable(
  {
    maintainabilityData,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Sonar Code Smell report is currently unavailable at this time";
  const fields = SonarPipelineTableMetadata.fields;
  let history = useHistory();

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
        let value = row?.value;
        if (value > 0) {
          if (value <= 1) {
            return <div className="green">A</div>;
          } else if (value <= 2) {
            return <div className="yellow">B</div>;
          } else if (value <= 3) {
            return <div className="yellow">C</div>;
          } else if (value <= 4) {
            return <div className="danger-red">D</div>;
          } else if (value <= 5) {
            return <div className="danger-red">E</div>;
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
      getKpiSonarRatingTableTextColumn(getField(fields, "maintainibility_rating")),
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
    const row = rowData?.original;
    const pipelineId = row?.pipelineId;
    const stepId = row?.stepId;
    const runCount = row?.runCount;
    const issueType = row?.issueType;

    toastContext.clearOverlayPanel();
    history.push(`/insights/reports/scans/sonar/${pipelineId}/${stepId}/${runCount}/${issueType}`);
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={maintainabilityData}
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
      title={`Technical Debt Ratio Report`}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
    />
  );
}

SonarRatingsMaintainabilityActionableInsightTable.propTypes = {
  maintainabilityData: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};

export default SonarRatingsMaintainabilityActionableInsightTable;