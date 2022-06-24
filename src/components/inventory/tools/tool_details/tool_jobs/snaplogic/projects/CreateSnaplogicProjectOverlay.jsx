import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import snaplogicProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/snaplogic/projects/snaplogic-project-metadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";
import SnaplogicProjectEditorPanel from "./details/SnaplogicProjectEditorPanel";

function CreateSnaplogicProjectOverlay({
  loadData,
  toolData,
  pmdDataObject,
  projectId,
}) {
  const toastContext = useContext(DialogToastContext);
  const [pmdRuleData, setPmdRuleData] = useState(undefined);
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
  }, [pmdDataObject]);

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(
      pmdDataObject,
      snaplogicProjectMetadata,
    );

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setPmdRuleData({ ...parsedModel });
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={snaplogicProjectMetadata.type}
      loadData={loadData}
    >
      <SnaplogicProjectEditorPanel
        pmdRuleData={pmdRuleData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        projectId={projectId}
      />
    </CreateCenterPanel>
  );
}

CreateSnaplogicProjectOverlay.propTypes = {
  toolData: PropTypes.object,
  pmdDataObject: PropTypes.object,
  loadData: PropTypes.func,
  projectId: PropTypes.string,
};

export default CreateSnaplogicProjectOverlay;
