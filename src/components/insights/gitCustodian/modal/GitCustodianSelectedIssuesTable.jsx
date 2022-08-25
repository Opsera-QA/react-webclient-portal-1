import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../common/table/CustomTable";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
  getGitCustodianOriginColumn,
  getPathDefinition,
  getGitCustodianExternalLinkIconColumnDefinition,
} from "../../../common/table/table-column-helpers";
import { getDurationInDaysHours } from "components/common/table/table-column-helpers-v2";
import {getField} from "../../../common/metadata/metadata-helpers";
import FilterContainer from "../../../common/table/FilterContainer";
import { GitCustodianFilterMetadata } from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";

function GitCustodianSelectedIssuesTable({ selectedIssues }) {
  const fields = GitCustodianFilterMetadata.fields;
  const columns = useMemo(
    () => [
      getTableDateTimeColumn(getField(fields, "commitDate")),
      getTableTextColumn(getField(fields, "repository")),
      getTableTextColumn(getField(fields, "author")),
      getPathDefinition(getField(fields, "path")),
      getGitCustodianExternalLinkIconColumnDefinition(getField(fields, "lineNumber")),
      getGitCustodianOriginColumn(getField(fields, "service")),
      getDurationInDaysHours(getField(fields, "exposedHours")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "status")),
    ],
    [],
  );

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={selectedIssues}
      />
    );
  };

  return (
    <FilterContainer
      title={'Vulnerable Commits'}
      body={getTable()}
      metadata={GitCustodianFilterMetadata}
      supportSearch={false}
    />
  );
}

GitCustodianSelectedIssuesTable.propTypes = {
  selectedIssues: PropTypes.array,
};

export default GitCustodianSelectedIssuesTable;