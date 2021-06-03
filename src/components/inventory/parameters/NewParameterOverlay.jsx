import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import ParameterModel from "components/inventory/parameters/parameter.model";

function NewParameterOverlay({ loadData, isMounted, parameterMetadata, getAccessToken, cancelTokenSource }) {
  const toastContext = useContext(DialogToastContext);
  const [parameterModel, setParameterModel] = useState(
    new ParameterModel({...parameterMetadata.newObjectFields}, parameterMetadata, true, undefined, getAccessToken, cancelTokenSource, loadData)
  );

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
  parameterMetadata: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object
};

export default NewParameterOverlay;


