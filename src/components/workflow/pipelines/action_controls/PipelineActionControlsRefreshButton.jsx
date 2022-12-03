import React from "react";
import PropTypes from "prop-types";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function PipelineActionControlsRefreshButton(
  {
    handleRefreshWorkflowClick, // TODO: Move logic in here
    isLoading,
  }) {
  return (
    <PipelineActionControlButtonBase
      icon={faSync}
      buttonState={isLoading === true ? buttonLabelHelper.BUTTON_STATES.BUSY : undefined}
      onClickFunction={handleRefreshWorkflowClick}
      variant={"secondary"}
      className={""}
      iconClassName={""}
    />
  );
}

PipelineActionControlsRefreshButton.propTypes = {
  handleRefreshWorkflowClick: PropTypes.func,
  isLoading: PropTypes.bool,
};
