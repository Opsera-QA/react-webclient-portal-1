import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import gitScraperReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/metadata/gitScraperReport.metadata";
import {
  getTableTextColumn,
  getGitCustodianScmLinkIconColumnDefinition,
  getPathDefinition,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import { pluralize } from "components/common/helpers/string-helpers";
import CustomTable from "components/common/table/CustomTable";
import ExportGitCustodianReportButton from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/export/ExportGitCustodianReportButton";
import ExportGitCustodianReportPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/export/ExportGitCustodianReportPanel";

function GitScraperLogSummaryTable({ gitScraperObj, isLoading }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = gitScraperReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "author")),
      getTableTextColumn(getField(fields, "commit")),
      getTableTextColumn(getField(fields, "commitHash")),
      getPathDefinition(getField(fields, "path"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "lineNumber")),
      getGitCustodianScmLinkIconColumnDefinition(
        getField(fields, "linkToSecret"),
      ),
      getTableTextColumn(getField(fields, "reason")),
      getTableTextColumn(getField(fields, "severity")),
    ],
    [],
  );

  const getBody = () => {
    if (showExportPanel === true) {
      return (
        <ExportGitCustodianReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          gitCustodianData={gitScraperObj}
          isLoading={isLoading}
        />
      );
    }

    return (
      <CustomTable
        data={gitScraperObj}
        columns={columns}
        // onRowSelect={onRowSelect}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(gitScraperObj) || gitScraperObj.length === 0) {
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
      body={getBody()}
      titleIcon={faExclamationCircle}
      title={`${pluralize(gitScraperObj?.length, "Record")} Found`}
      className={"mt-2"}
      exportButton={
        <ExportGitCustodianReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
          isLoading={isLoading}
        />
      }
    />
  );
}

GitScraperLogSummaryTable.propTypes = {
  gitScraperObj: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default GitScraperLogSummaryTable;
