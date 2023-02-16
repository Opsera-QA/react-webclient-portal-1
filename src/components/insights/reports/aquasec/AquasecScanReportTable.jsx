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
  }) {
  const fields = aquasecScanReportMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => field.id === "imageName")),
      getTableTextColumn(fields.find(field => field.id === "componentName")),
      getTableTextColumn(fields.find(field => field.id === "severity")),
      getTableTextColumn(fields.find(field => field.id === "cve_id")),
      getTableTextColumn(fields.find(field => field.id === "cve_score")),
      getTableTextColumn(fields.find(field => field.id === "description")),
      getTableTextColumn(fields.find(field => field.id === "action")),
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
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getAquasecScanReportTable()}
      titleIcon={faTally}
      title={"Aquasec Scan"}
      className={"px-2 pb-2"}
      exportButton={<ExportAquasecScanDetailsButton className={"ml-2"} isLoading={isLoading} scanData={data} allIssues={allIssues} />}
    />
  );
}

AquasecScanReportTable.propTypes = {
  data: PropTypes.array,
  allIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};

export default AquasecScanReportTable;