import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import fortifyReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/metadata/fortifyReport.metadata";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportFortifyReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/export/ExportFortifyReportButton";
import ExportFortifyReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/export/ExportFortifyReportPanel";

function FortifyLogSummaryTable({ fortifyObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = fortifyReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "fileName")),
      getTableTextColumn(getField(fields, "filePath")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getTableTextColumn(getField(fields, "category")),
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "status")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportFortifyReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          fortifyData={fortifyObj}
        />
      );
    }

    return (
      <VanityTable
        data={fortifyObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(fortifyObj) || fortifyObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
        There were no secrets identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Report`}
      className={"mt-2"}
      exportButton={
        <ExportFortifyReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

FortifyLogSummaryTable.propTypes = {
  fortifyObj: PropTypes.array,
};

export default FortifyLogSummaryTable;
