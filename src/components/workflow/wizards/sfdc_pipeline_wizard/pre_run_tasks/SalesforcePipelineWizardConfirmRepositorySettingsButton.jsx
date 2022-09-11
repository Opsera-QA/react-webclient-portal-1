import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { PIPELINE_START_WIZARD_FLOWS } from "components/workflow/pipelines/pipeline_details/PipelineStartWizard";

export default function SalesforcePipelineWizardConfirmRepositorySettingsButton(
  {
    setCurrentScreen,
    pipeline,
    disabled,
    className,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
    isMounted,
  } = useComponentStateReference();

  const updatePipeline = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await pipelineActions.updatePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id, pipeline);
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      setCurrentScreen(PIPELINE_START_WIZARD_FLOWS.SALESFORCE_PIPELINE_WIZARD);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Finishing Workflow Initialization");
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      buttonState,
      "Confirm Repository Settings",
      "Saving Repository Settings",
      "Saved Repository Settings!",
      "Error Saving Repository Settings!",
    );
  };

  const getButtonVariant = () => {
    return buttonLabelHelper.getVariantForState(
      "success",
      buttonState,
    );
  };

  if (pipeline == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY || disabled}
        onClick={updatePipeline}
        variant={getButtonVariant()}
      >
        <span>
          <IconBase
            isLoading={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
            icon={faCheckCircle}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

SalesforcePipelineWizardConfirmRepositorySettingsButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  pipeline: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

