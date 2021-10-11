import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import axios from "axios";
import OctopusApplicationWrapper
  from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/OctopusApplicationWrapper";

function NewOctopusApplicationOverlay({ toolData, loadData, isMounted, type }) {
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    return () => {
      source.cancel();
    };
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={"Octopus Application"}
      loadData={loadData}
      showCloseButton={true}
    >
      <OctopusApplicationWrapper
        type={type}
        toolData={toolData}
        loadData={loadData}
        isMounted={isMounted}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewOctopusApplicationOverlay.propTypes = {
  toolData: PropTypes.object,
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  type: PropTypes.string,
};

export default NewOctopusApplicationOverlay;


