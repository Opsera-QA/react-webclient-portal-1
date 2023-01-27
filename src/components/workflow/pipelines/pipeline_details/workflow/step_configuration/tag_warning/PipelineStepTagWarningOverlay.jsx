import React, {useState} from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import PipelineStepTagWarningSkipButton
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/tag_warning/PipelineStepTagWarningSkipButton";
import PipelineStepTagWarningApplyTagButton
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/tag_warning/PipelineStepTagWarningApplyTagButton";

export default function PipelineStepTagWarningOverlay(
  {
    stepConfigurationModel,
    setStepConfigurationModel,
    savePipelineStepConfiguration,
  }) {
  const field = stepConfigurationModel?.getFieldById("tags");
  const [busy, setBusy] = useState(false);
  const {
    toastContext,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"p-3"}>
        <CancelButton
          className={"ml-2"}
          cancelFunction={closeOverlayFunction}
          size={"1x"}
          disabled={busy === true}
        />
        <PipelineStepTagWarningSkipButton
          className={"ml-2"}
          stepConfigurationModel={stepConfigurationModel}
          setStepConfigurationModel={setStepConfigurationModel}
          savePipelineStepConfiguration={savePipelineStepConfiguration}
          disabled={busy === true}
          setBusy={setBusy}
        />
        <PipelineStepTagWarningApplyTagButton
          className={"ml-2"}
          stepConfigurationModel={stepConfigurationModel}
          setStepConfigurationModel={setStepConfigurationModel}
          savePipelineStepConfiguration={savePipelineStepConfiguration}
          disabled={busy === true}
          setBusy={setBusy}
        />
      </ButtonContainerBase>
    );
  };

  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Pipeline Step Tag Warning`}
      titleIcon={faTriangleExclamation}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          <div>{field?.formText}</div>
          <div>{`If you aren't sure what Tag value to use and no Tags are applied, Opsera will apply a unique tag derived from the step upon hitting Proceed.`}</div>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

PipelineStepTagWarningOverlay.propTypes = {
  stepConfigurationModel: PropTypes.object,
  setStepConfigurationModel: PropTypes.func,
  savePipelineStepConfiguration: PropTypes.func,
};
