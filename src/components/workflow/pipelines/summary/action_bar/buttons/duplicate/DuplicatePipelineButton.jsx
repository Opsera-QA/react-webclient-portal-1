import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faCopy} from "@fortawesome/pro-light-svg-icons";
import useButtonState from "hooks/general/buttons/useButtonState";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import {useHistory} from "react-router-dom";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function DuplicatePipelineButton(
  {
    duplicatePipelineModel,
    className,
  }) {
  const { buttonState, buttonStateFunctions } = useButtonState();
  const pipelineActions = usePipelineActions();
  const history = useHistory();
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const handlePipelineDuplicationFunction = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await pipelineActions.duplicatePipeline(duplicatePipelineModel);
      history.push(pipelineHelper.getDetailViewLink(DataParsingHelper.parseNestedMongoDbId(response, "data.data._id")));
      buttonStateFunctions.setSuccessState();
      toastContext.showSystemInformationToast("Your new Pipeline has been created, duplicating all of the settings from this one. This Pipeline is now in your list of Pipelines for viewing.  No tools or activity logs have been duplicated in this process.");
      toastContext.clearOverlayPanel();
    } catch (error) {
      if (isMounted?.current === true) {
        buttonStateFunctions.setErrorState();
        toastContext.showSystemErrorToast(error, "There was an issue Duplicating this Pipeline:");
      }
    }
  };

  if (duplicatePipelineModel == null) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      icon={faCopy}
      disabled={duplicatePipelineModel?.checkCurrentValidity() !== true}
      onClickFunction={handlePipelineDuplicationFunction}
      buttonState={buttonState}
      normalText={"Duplicate Pipeline"}
      errorText={"Failed to Duplicate Pipeline"}
      successText={"Successfully Duplicated Pipeline"}
      busyText={"Duplicating Pipeline"}
    />
  );
}

DuplicatePipelineButton.propTypes = {
  duplicatePipelineModel: PropTypes.object,
  className: PropTypes.string,
};
