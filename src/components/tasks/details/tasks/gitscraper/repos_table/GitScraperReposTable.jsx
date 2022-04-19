import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import gitScraperReposMetadata from "./gitscraper-repos-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import GitScraperReposOverlay from "./GitScraperReposOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function GitScraperReposTable({ setParentDataObject, gitScraperRepos, loadData, onRowSelect, isLoading,parentDataObject }) {
  const toastContext = useContext(DialogToastContext);
  let fields = gitScraperReposMetadata.fields;

  const createGitScraperRepos = () => {
    toastContext.showOverlayPanel(<GitScraperReposOverlay setParentDataObject={setParentDataObject} loadData={loadData} parentDataObject={parentDataObject} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "service")),
      getTableTextColumn(getField(fields, "repository")),
      getTableTextColumn(getField(fields, "gitBranch")),
      getTableBooleanIconColumn(getField(fields, "excludeFiles"))
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={gitScraperRepos}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"GitScraper Repository Selection"}
      type={"GitScraper Repository Selection"}
      titleIcon={faBrowser}
      addRecordFunction={createGitScraperRepos}
      body={getTable()}
      showBorder={false}
    />
  );
}

GitScraperReposTable.propTypes = {
  setParentDataObject: PropTypes.object,
  parentDataObject: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  gitScraperRepos: PropTypes.array
};

export default GitScraperReposTable;
