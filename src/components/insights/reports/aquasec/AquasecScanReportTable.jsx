import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import aquasecScanReportMetadata from "./aquasecScanReportTable.metadata";
import ExportAquasecScanDetailsButton from "./export/ExportAquasecScanDetailsButton";

function AquasecScanReportTable(
  {
    data,
    allIssues,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
      severity,
      imageName,
      pipelineId
  }) {
  const fields = aquasecScanReportMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => field.id === "componentName")),
        getTableTextColumn(fields.find(field => field.id === "componentVersion")),
      getTableTextColumn(fields.find(field => field.id === "severity")),
      getTableTextColumn(fields.find(field => field.id === "identifier")),
      getTableTextColumn(fields.find(field => field.id === "score")),
      getTableTextColumn(fields.find(field => field.id === "description")),
    ],
    []
  );

  const getAquasecScanReportTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        loadData={loadData}
      />
    );
  };

  return (
      <div>
          <div className={"d-flex details-title-text"}>
              <div className={'mr-4'}>
                  <b>PipelineId:</b> {pipelineId}
              </div>
              <div className={'mr-4'}>
                  <b>ImageName:</b> {imageName}
              </div>
          </div>
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getAquasecScanReportTable()}
      titleIcon={faTally}
      title={"Aquasec " + severity+" Issues Scan"}
      className={"px-2 pb-2"}
      exportButton={<ExportAquasecScanDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} />}
    />
      </div>
  );
}

AquasecScanReportTable.propTypes = {
  data: PropTypes.array,
  allIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
    severity:PropTypes.string,
    imageName:PropTypes.string,
    pipelineId:PropTypes.string,
};

export default AquasecScanReportTable;