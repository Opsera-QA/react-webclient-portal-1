import React, {useContext, useEffect, useRef, useState} from "react";
import GitScraperReposTable from "./GitScraperReposTable";
import PropTypes from "prop-types";
import GitScraperReposOverlay from "./GitScraperReposOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function GitScraperRepos({ setParentDataObject, loadData, isLoading, toolApplications, parentDataObject }) {
  const toastContext = useContext(DialogToastContext);
  const [gitScraperRepos, setGitScraperRepos] = useState([]);
  console.log(toolApplications);

  useEffect(() => {
    setGitScraperRepos(toolApplications);
  }, [toolApplications]);

  const onRowSelect = (grid, row) => {
    console.log(toolApplications);
    let selectedRow = toolApplications[row?.index];
    console.log(selectedRow);
    toastContext.showOverlayPanel(
      <GitScraperReposOverlay
        gitscraperDataObject={selectedRow}
        applicationId={row?.index}
        setParentDataObject={setParentDataObject}
        parentDataObject={parentDataObject}
        loadData={loadData}
      />
    );
  };

  return (
    <GitScraperReposTable
      isLoading={isLoading}
      setParentDataObject={setParentDataObject}
      parentDataObject={parentDataObject}
      loadData={loadData}
      onRowSelect={onRowSelect}
      gitScraperRepos={gitScraperRepos}
    />
  );
}

GitScraperRepos.propTypes = {
  setParentDataObject: PropTypes.object,
  parentDataObject: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolApplications: PropTypes.array
};
export default GitScraperRepos;
