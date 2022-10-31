import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteModelButton from "components/common/actions/buttons/ActionBarDeleteModelButton";
import { useHistory } from "react-router-dom";
import { pipelineInstructionsHelper } from "components/settings/pipelines/instructions/pipelineInstructions.helper";

export default function ActionBarDeletePipelineInstructionsButton({ pipelineInstructionsModel, className }) {
  const history = useHistory();

  const afterDeleteFunction = () => {
    history.push(pipelineInstructionsHelper.getManagementScreenLink());
  };

  if (pipelineInstructionsModel?.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteModelButton
      model={pipelineInstructionsModel}
      type={"Pipeline Instructions"}
      className={className}
      afterDeleteFunction={afterDeleteFunction}
    />
  );
}

ActionBarDeletePipelineInstructionsButton.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  className: PropTypes.string,
};