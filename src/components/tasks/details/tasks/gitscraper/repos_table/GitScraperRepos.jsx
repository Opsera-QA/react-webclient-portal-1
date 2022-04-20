import React, {useContext, useEffect, useRef, useState} from "react";
import GitScraperReposTable from "./GitScraperReposTable";
import PropTypes from "prop-types";
import GitScraperReposOverlay from "./GitScraperReposOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import modelHelpers from "../../../../../common/model/modelHelpers";
import gitScraperReposMetadata from "./gitscraper-repos-metadata";

function GitScraperRepos({ setParentDataObject, loadData, isLoading, toolApplications, parentDataObject }) {
  const toastContext = useContext(DialogToastContext);
  const [gitScraperRepos, setGitScraperRepos] = useState([]);

  useEffect(() => {
    setGitScraperRepos(toolApplications);
  }, [toolApplications]);

  return (
    <GitScraperReposTable
      isLoading={isLoading}
      setParentDataObject={setParentDataObject}
      parentDataObject={parentDataObject}
      loadData={loadData}
      gitScraperRepos={gitScraperRepos}
    />
  );
}

GitScraperRepos.propTypes = {
  setParentDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolApplications: PropTypes.array
};
export default GitScraperRepos;
