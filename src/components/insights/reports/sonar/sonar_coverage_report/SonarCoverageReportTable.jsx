import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTally} from "@fortawesome/pro-light-svg-icons";
import sonarActionableCoverageReportMetadata from "./sonarActionableCoverageReport.metadata";
import {getField} from "../../../../common/metadata/metadata-helpers";
import ExportSonarCoverageButton from "./export/ExportSonarCoverageButton";
import ExportSonarCoverageOverlay from "./export/ExportSonarCoverageOverlay";

function SonarCoverageReportTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  projectId
}) {
  const fields = sonarActionableCoverageReportMetadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

  const columns = useMemo(
    () => [
        getTableTextColumn(getField(fields, "path"), "path"),
        getTableTextColumn(getField(fields, "name"), "name"),
        getTableTextColumn(getField(fields, "complexity"), "complexity"),
        getTableTextColumn(getField(fields, "line_coverage"), "line_coverage"),
        getTableTextColumn(getField(fields, "coverage"), "coverage"),
        getTableTextColumn(getField(fields, "lines_to_cover"), "lines_to_cover"),
    ],
    []
  );

  const getSonarQubeScanReportTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportSonarCoverageOverlay
            showExportPanel={showExportPanel}
            setShowExportPanel={setShowExportPanel}
            LookupDetailsData={data}
        />
      );
    }

    return (
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div>
        <div className={"d-flex details-title-text"}>
          <div className={'mr-4'}>
            <b>Total Issues:</b> {data.length}
          </div>
        </div>
        <FilterContainer
            loadData={loadData}
            isLoading={isLoading}
            body={getSonarQubeScanReportTable()}
            titleIcon={faTally}
            title={"SonarQube Project: " + projectId}
            className={"px-2 pb-2"}
            exportButton={
              <ExportSonarCoverageButton
                className={"ml-2"}
                setShowExportPanel={setShowExportPanel}
                showExportPanel={showExportPanel}
              />
            }
        />
    </div>
  );
}

SonarCoverageReportTable.propTypes = {
  data: PropTypes.array,
  allSonarIssues: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  projectId: PropTypes.string
};

export default SonarCoverageReportTable;