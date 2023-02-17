import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import AquasecActionableInsightsMetadata from "./aquasec-actionable-insights-metadata";
import {
  getChartTrendStatusColumn, getCustomTableAccessor, getCustomTableHeader, getTableDateTimeColumn,
  getTableTextColumn,
  getTableTextColumnWithoutField,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";

// TODO: Convert to cards
function AquasecActionableInsightsTable({ data, isLoading, loadData, filterModel, setFilterModel, title, severity }) {
  const toastContext = useContext(DialogToastContext);
  const fields = AquasecActionableInsightsMetadata.fields;
  const tableTitle = "Aquasec " + title + " Report";
  const noDataMessage = "Aquasec " + title + " report is currently unavailable at this time";
  let history = useHistory();

  const getAquasecTableTextColumn = (field, block) => {
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
      getTableTextColumn(getField(fields, "imageName"), "imageName"),
      getTableTextColumn(getField(fields, "pipelineId"), "pipelineId"),
      getTableTextColumn(getField(fields, "run"), "run"),
      getTableDateTimeColumn(getField(fields, "timestamp"), "timestamp"),
      getAquasecTableTextColumn(getField(fields, "total_issues"), "total_issues"),
      getAquasecTableTextColumn(getField(fields, "total_components"), "total_components"),
      getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    const row = rowData?.original;
    const pipelineId = row?.pipelineId;
    const imageName = row?.imageName;
    const runCount = row?.run;
    //const severity = row?.severity;

    toastContext.clearOverlayPanel();
    history.push(`/insights/reports/scans/aquasec/${pipelineId}/${imageName}/${runCount}/${severity}`);
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

AquasecActionableInsightsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  title: PropTypes.string,
  severity: PropTypes.string,
};

export default AquasecActionableInsightsTable;