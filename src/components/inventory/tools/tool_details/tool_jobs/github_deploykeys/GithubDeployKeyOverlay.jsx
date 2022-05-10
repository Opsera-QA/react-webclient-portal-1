import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import githubDeployKeyMetadata from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/github-deploykeys-metadata";
import GithubDeployKeysEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/details/GithubDeployKeysEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function GithubDeployKeyOverlay({ loadData, toolData, deployKeyDataObject, repoId }) {
  const toastContext = useContext(DialogToastContext);
  const [githubDeployKeyData, setGithubDeployKeyData] = useState(undefined);
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
  }, [deployKeyDataObject]);

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(deployKeyDataObject, githubDeployKeyMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setGithubDeployKeyData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={githubDeployKeyMetadata.type} loadData={loadData}>
      <GithubDeployKeysEditorPanel
        githubDeployKeyData={githubDeployKeyData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        repoId={repoId}
      />
    </CreateCenterPanel>
  );
}

GithubDeployKeyOverlay.propTypes = {
  toolData: PropTypes.object,
  deployKeyDataObject: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
};

export default GithubDeployKeyOverlay;
