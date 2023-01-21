import React from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faCheckCircle, faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import Model from "core/data_model/model";
import tagMetadata from "components/settings/tags/tag.metadata";

export default function PipelineStepTagWarningOverlay(
  {
    stepConfigurationModel,
    setStepConfigurationModel,
    savePipelineStepConfiguration,
  }) {
  const field = stepConfigurationModel?.getFieldById("tags");
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const applyTagAndSave = async () => {
    const tagValue = pipelineHelper.getTagValueForStep(stepConfigurationModel?.getCurrentData());
    const newTag = {
      type: "pipeline",
      value: tagValue,
      active: true,
      configuration: {},
    };
    const newTagModel = new Model(newTag, tagMetadata, true);
    await adminTagsActions.createTagV2(getAccessToken, cancelTokenSource, newTagModel);
    stepConfigurationModel?.setData("tags", [{type: "pipeline", value: tagValue}]);
    setStepConfigurationModel({...stepConfigurationModel});
    savePipelineStepConfiguration(stepConfigurationModel);
  };


  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Pipeline Step Tag Warning`}
      titleIcon={faTriangleExclamation}
      showToasts={true}
      showCloseButton={false}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          <div>{field?.formText}</div>
          <ButtonContainerBase>
            <CancelButton
              className={"ml-2"}
              cancelFunction={closeOverlayFunction}
              size={"1x"}
            />
            <VanityButtonBase
              onClickFunction={savePipelineStepConfiguration}
              variant={"outline-warning"}
              icon={faTriangleExclamation}
              className={"ml-2"}
              normalText={"Skip"}
            />
            <VanityButtonBase
              onClickFunction={applyTagAndSave}
              variant={"success"}
              className={"ml-2"}
              normalText={"Proceed"}
              icon={faCheckCircle}
            />
          </ButtonContainerBase>
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
