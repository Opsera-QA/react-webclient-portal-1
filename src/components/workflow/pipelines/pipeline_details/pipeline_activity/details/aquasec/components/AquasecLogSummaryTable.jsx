import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import aquasecReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/metadata/aquasecReport.metadata";
import {
  getTableTextColumn,
  getTableActiveBooleanIconColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import ExportAquasecReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/export/ExportAquasecReportButton";
import ExportAquasecReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/export/ExportAquasecReportPanel";

function AquasecLogSummaryTable({ aquasecObj }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = aquasecReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "revision")),
      getTableTextColumn(getField(fields, "state")),
      getTableActiveBooleanIconColumn(getField(fields, "isNew"), "", 100),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportAquasecReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          aquasecData={aquasecObj}
        />
      );
    }

    return (
      <VanityTable
        data={aquasecObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(aquasecObj) || aquasecObj.length === 0) {
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
        <ExportAquasecReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

AquasecLogSummaryTable.propTypes = {
  aquasecObj: PropTypes.array,
};

export default AquasecLogSummaryTable;
