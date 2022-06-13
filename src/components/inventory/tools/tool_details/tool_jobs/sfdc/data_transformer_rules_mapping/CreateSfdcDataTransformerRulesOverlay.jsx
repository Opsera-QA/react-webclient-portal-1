import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import sfdcDataTransformerRulesMapMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/data_transformer_rules_mapping/sfdc-data-transformer-rules-mapping-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";
import SfdcDataTransformerRulesEditorPanel from "./details/SfdcDataTransformerRulesEditorPanel";

function CreateSfdcDataTransformerRulesOverlay({ loadData, toolData, dataTransformerDataObject, ruleId }) {
  const toastContext = useContext(DialogToastContext);
  const [dataTransformerRuleData, setDataTransformerRuleData] = useState(undefined);
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
  }, [dataTransformerDataObject]);

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(dataTransformerDataObject, sfdcDataTransformerRulesMapMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setDataTransformerRuleData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={sfdcDataTransformerRulesMapMetadata.type} loadData={loadData}>
      <SfdcDataTransformerRulesEditorPanel
        dataTransformerRuleData={dataTransformerRuleData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        ruleId={ruleId}
      />
    </CreateCenterPanel>
  );
}

CreateSfdcDataTransformerRulesOverlay.propTypes = {
  toolData: PropTypes.object,
  dataTransformerDataObject: PropTypes.object,
  loadData: PropTypes.func,
  ruleId: PropTypes.string,
};

export default CreateSfdcDataTransformerRulesOverlay;
