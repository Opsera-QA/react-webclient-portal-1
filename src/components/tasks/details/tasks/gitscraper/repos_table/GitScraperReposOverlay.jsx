import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import gitScraperReposMetadata from "./gitscraper-repos-metadata";
import GitScraperReposEditorPanel from "./details/GitScraperReposEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function GitScraperReposOverlay({ loadData, setParentDataObject, gitscraperDataObject, applicationId, parentDataObject,gitScraperRepos, setGitscraperList, model }) {
  const toastContext = useContext(DialogToastContext);
  const [gitScraperReposData, setGitScraperReposData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeModel();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [gitscraperDataObject]);

  const initializeModel = () => {
    setGitScraperReposData(modelHelpers.parseObjectIntoModel(gitscraperDataObject, gitScraperReposMetadata));
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={gitScraperReposMetadata.type} loadData={loadData}>
      <GitScraperReposEditorPanel
        gitScraperReposData={gitScraperReposData}
        setParentDataObject={setParentDataObject}
        setGitscraperList={setGitscraperList}
        parentDataObject={parentDataObject}
        loadData={loadData}
        handleClose={closePanel}
        applicationId={applicationId}
        gitScraperRepos={gitScraperRepos}
        model={model}
      />
    </CreateCenterPanel>
  );
}

GitScraperReposOverlay.propTypes = {
  setParentDataObject: PropTypes.func,
  setGitscraperList: PropTypes.func,
  parentDataObject: PropTypes.object,
  gitscraperDataObject: PropTypes.object,
  model: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.number,
  gitScraperRepos: PropTypes.array
};

export default GitScraperReposOverlay;
