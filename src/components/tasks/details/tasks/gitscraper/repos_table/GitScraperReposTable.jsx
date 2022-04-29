import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import gitScraperReposMetadata from "./gitscraper-repos-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import GitScraperReposOverlay from "./GitScraperReposOverlay";
import CustomTable from "../../../../../common/table/CustomTable";

function GitScraperReposTable({ setParentDataObject, gitScraperRepos, isLoading,parentDataObject }) {
  const toastContext = useContext(DialogToastContext);
  let fields = gitScraperReposMetadata.fields;
  console.log(parentDataObject);

  const loadData = async () => {
    console.log(gitScraperRepos, parentDataObject);
  };

  const createGitScraperRepos = () => {
    toastContext.showOverlayPanel(<GitScraperReposOverlay setParentDataObject={setParentDataObject} loadData={loadData} parentDataObject={parentDataObject} gitScraperRepos={gitScraperRepos}/>);
  };

  const columns = useMemo(
    () => [
      { Header: "Repository", accessor: "repository", class: undefined },
      { Header: "Branch", accessor: "gitBranch", class: undefined },
    ],
    []
  );

  const noDataMessage = "No Repositories configured for the scan";

  const onRowSelect = (rowData) => {
    let selectedRow = gitScraperRepos[rowData?.index];
    toastContext.showOverlayPanel(
      <GitScraperReposOverlay
        gitscraperDataObject={selectedRow}
        applicationId={rowData?.index}
        setParentDataObject={setParentDataObject}
        parentDataObject={parentDataObject}
        loadData={loadData}
        gitScraperRepos={gitScraperRepos}
      />
    );
  };

  const getTable = () => {
    return (
    <CustomTable
      columns={columns}
      data={parentDataObject?.data?.configuration?.reposToScan}
      onRowSelect={onRowSelect}
      isLoading={isLoading}
      noDataMessage={noDataMessage}
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
      metadata={gitScraperReposMetadata}
    />
  );
}

GitScraperReposTable.propTypes = {
  setParentDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  isLoading: PropTypes.bool,
  gitScraperRepos: PropTypes.array,
};

export default GitScraperReposTable;
