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

// TODO: Convert to cards
function SonarRatingsMaintainabilityActionableInsightTable({maintainibilityData, isLoading}) {
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = "Sonar Code Smell report is currently unavailable at this time";
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

  const columns = useMemo(
    () => [
      getKpiSonarPipelineTableTextColumn(getField(fields, "project")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "runCount")),
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
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount}/>
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={maintainibilityData}
        noDataMessage={noDataMessage}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      showBorder={false}
      title={`Technical Debt Ratio Report`}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
    />
  );
}

SonarRatingsMaintainabilityActionableInsightTable.propTypes = {
  maintainibilityData: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default SonarRatingsMaintainabilityActionableInsightTable;
