import React from "react";
import PropTypes from "prop-types";
import {faHistory} from "@fortawesome/pro-light-svg-icons";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import ResetButton from "components/common/buttons/reset/ResetButton";
import InfoContainer from "components/common/containers/InfoContainer";

function ResetConfirmationPanel(
  {
    model,
    subPanel,
    closePanelFunction,
    resetDataFunction,
    resetButton,
  }) {
  const getResetButton = () => {
    if (resetButton) {
      return resetButton;
    }

    return (
      <ResetButton
        model={model}
        resetFunction={resetDataFunction}
      />
    );
  };

  const getSubPanel = () => {
    if (subPanel) {
      return (
        <div className={"my=2"}>
          {subPanel}
        </div>
      );
    }
  };

  if (model == null || (resetDataFunction == null && resetButton == null)) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`Confirm ${model.getType()} Reset`}
      titleIcon={faHistory}
    >
      <div className="m-3">
        <div className="mb-2">
          <div>Data cannot be recovered once this {model?.getType()} is reset.</div>
          <div>Do you still want to proceed?</div>
        </div>
        {getSubPanel()}
        <SaveButtonContainer>
          <CancelButton
            size={"md"}
            className={"mx-2"}
            cancelFunction={closePanelFunction}
          />
          {getResetButton()}
        </SaveButtonContainer>
      </div>
    </InfoContainer>
  );
}

ResetConfirmationPanel.propTypes = {
  model: PropTypes.object,
  closePanelFunction: PropTypes.func,
  subPanel: PropTypes.any,
  resetDataFunction: PropTypes.func,
  resetButton: PropTypes.any,
};

export default ResetConfirmationPanel;


