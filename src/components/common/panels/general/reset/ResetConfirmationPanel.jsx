import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import TitleBar from "components/common/fields/TitleBar";
import CancelButton from "components/common/buttons/CancelButton";
import ResetButton from "components/common/buttons/reset/ResetButton";

function ResetConfirmationPanel({ model, subPanel, closePanelFunction, resetDataFunction }) {
  const getSubPanel = () => {
    if (subPanel) {
      return (
        <div className={"my=2"}>
          {subPanel}
        </div>
      );
    }
  };

  if (model == null) {
    return null;
  }

  return (
    <div className={"filter-container content-container"}>
      <div className="px-2 py-1 filter-title-bar content-block-header title-text-header-1">
        <TitleBar title={`Confirm ${model.getType()} Reset`} titleIcon={faTrash}/>
      </div>
      <div className="m-3">
        <div className="mb-2">
          <div>Data cannot be recovered once this {model?.getType()} is reset.</div>
          <div>Do you still want to proceed?</div>
        </div>
        {getSubPanel()}
        <SaveButtonContainer>
          <CancelButton
            className={"mx-2"}
            cancelFunction={closePanelFunction}
          />
          <ResetButton
            model={model}
            resetFunction={resetDataFunction}
          />
        </SaveButtonContainer>
      </div>
    </div>
  );
}

ResetConfirmationPanel.propTypes = {
  model: PropTypes.object,
  closePanelFunction: PropTypes.func,
  subPanel: PropTypes.any,
  resetDataFunction: PropTypes.func,
};

export default ResetConfirmationPanel;


