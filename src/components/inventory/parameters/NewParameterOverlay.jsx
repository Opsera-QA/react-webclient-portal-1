import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";

function NewParameterOverlay({ loadData, isMounted, parameterMetadata }) {
  const toastContext = useContext(DialogToastContext);
  const [parameterModel, setParameterModel] = useState(new Model({...parameterMetadata.newObjectFields}, parameterMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={parameterMetadata?.type} loadData={loadData}>
      <ParametersEditorPanel handleClose={closePanel} parameterModel={parameterModel}/>
    </CreateCenterPanel>
  );
}

NewParameterOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object
};

export default NewParameterOverlay;


