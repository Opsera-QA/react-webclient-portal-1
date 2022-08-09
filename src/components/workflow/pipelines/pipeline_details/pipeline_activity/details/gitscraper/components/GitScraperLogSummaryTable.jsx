import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import gitScraperReportMetaData from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/metadata/gitScraperReport.metadata";
import {
    getTableTextColumn,
    getGitCustodianScmLinkIconColumnDefinition,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import { pluralize } from "components/common/helpers/string-helpers";
import CustomTable from "components/common/table/CustomTable";
import ExportGitCustodianExecutionSummaryReportButton from "components/common/buttons/export/reports/ExportGitCustodianExecutionSummaryReportButton";

function GitScraperLogSummaryTable({ gitScraperObj, isLoading }) {
  const fields = gitScraperReportMetaData?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "author")),
      getTableTextColumn(getField(fields, "commit")),
      getTableTextColumn(getField(fields, "commitHash")),
      getTableTextColumn(getField(fields, "path")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getGitCustodianScmLinkIconColumnDefinition(
        getField(fields, "linkToSecret"),
      ),
      getTableTextColumn(getField(fields, "reason")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
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
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`${pluralize(gitScraperObj?.length, 'Record')} Found`}
      className={"mt-2"}
      exportButton={<ExportGitCustodianExecutionSummaryReportButton className={"ml-2"} gitCustodianData={gitScraperObj} isLoading={isLoading} />}
    />
  );
}

GitScraperLogSummaryTable.propTypes = {
  gitScraperObj: PropTypes.array,
  isLoading: PropTypes.bool
};

export default GitScraperLogSummaryTable;
