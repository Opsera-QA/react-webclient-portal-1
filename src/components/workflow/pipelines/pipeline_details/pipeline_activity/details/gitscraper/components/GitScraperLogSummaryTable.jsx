import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import gitScraperReportMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/metadata/gitScraperReport.metadata";
import {
  getColumnHeader, getColumnId,
  getTableTextColumn, getTableHyperLinkTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import { pluralize } from "components/common/helpers/string-helpers";

function GitScraperLogSummaryTable({ gitScraperObj }) {
  const fields = gitScraperReportMetaData?.fields;

  const getTooltipTemplate = () => {
    return "Click to view details";
  };
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "author")),
      getTableTextColumn(getField(fields, "commit")),
      getTableTextColumn(getField(fields, "commitHash")),
      getTableTextColumn(getField(fields, "path")),
      getTableHyperLinkTextColumn(
        getField(fields, "lineNumber"),
        "linkToSecret",
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(getField(fields, "reason")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={gitScraperObj}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(gitScraperObj) || gitScraperObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no secrets identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`${pluralize(gitScraperObj?.length, 'Report')} Found`}
      className={"mt-2"}
    />
  );
}

GitScraperLogSummaryTable.propTypes = {
  gitScraperObj: PropTypes.array,
};

export default GitScraperLogSummaryTable;