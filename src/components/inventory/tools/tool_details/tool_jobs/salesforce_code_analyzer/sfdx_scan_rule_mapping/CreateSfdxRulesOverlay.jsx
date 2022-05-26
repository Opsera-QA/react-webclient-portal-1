import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import pmdRulesMapMetadata from "components/inventory/tools/tool_details/tool_jobs/salesforce_code_analyzer/sfdx_scan_rule_mapping/sfdx-mapping-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";
import SfdxRulesEditorPanel from "./details/SfdxRulesEditorPanel";

function CreateSfdxRulesOverlay({ loadData, toolData, pmdDataObject, ruleId }) {
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
    let parsedModel = modelHelpers.parseObjectIntoModel(pmdDataObject, pmdRulesMapMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setPmdRuleData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={pmdRulesMapMetadata.type} loadData={loadData}>
      <SfdxRulesEditorPanel
          pmdRuleData={pmdRuleData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        ruleId={ruleId}
      />
    </CreateCenterPanel>
  );
}

CreateSfdxRulesOverlay.propTypes = {
  toolData: PropTypes.object,
  pmdDataObject: PropTypes.object,
  loadData: PropTypes.func,
  ruleId: PropTypes.string,
};

export default CreateSfdxRulesOverlay;
