import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import GithubCommitsActionableMetadata from "../github-commits-actionable-insight-metadata";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";

function GithubContributorsCommitsActionableInsightTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  title,
  tableTitleIcon
}) {
  const fields = GithubCommitsActionableMetadata.fields;
  const tableTitle = "Github " + title + " Report";
  const noDataMessage = "Github " + title + " report is currently unavailable at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "reviewerName"), "reviewerName"),
      getTableTextColumn(getField(fields, "totalCommits"), "totalCommits"),
      getTableTextColumn(getField(fields, "contributorName"), "contributorName")
    ],
    []
  );

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
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      title={tableTitle}
      titleIcon={tableTitleIcon}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
    />
  );
}

GithubContributorsCommitsActionableInsightTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  title: PropTypes.string,
  tableTitleIcon: PropTypes.object
};

export default GithubContributorsCommitsActionableInsightTable;
