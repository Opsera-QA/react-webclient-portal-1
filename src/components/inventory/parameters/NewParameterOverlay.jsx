import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import useGetNewParameterModel from "components/inventory/parameters/hooks/useGetNewParameterModel";
import customParametersMetadata
  from "@opsera/definitions/constants/registry/custom_parameters/customParameters.metadata";

export default function NewParameterOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const { parameterModel, setParameterModel } = useGetNewParameterModel();

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={customParametersMetadata?.type} loadData={loadData}>
      <div className={"mx-2"}>
        <ParametersEditorPanel
          handleClose={closePanel}
          parameterModel={parameterModel}
          setParameterModel={setParameterModel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewParameterOverlay.propTypes = {
  loadData: PropTypes.func,
};


