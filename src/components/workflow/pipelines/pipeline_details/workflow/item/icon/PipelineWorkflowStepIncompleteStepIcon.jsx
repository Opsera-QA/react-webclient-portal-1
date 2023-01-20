import React from "react";
import PropTypes from "prop-types";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import InfoOverlayBase from "components/common/overlays/info/InfoOverlayBase";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {pipelineValidationHelper} from "components/workflow/pipelines/helpers/pipelineValidation.helper";

export default function PipelineWorkflowStepIncompleteStepIcon(
  {
    pipelineStep,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchInfoOverlayPanel = () => {
    toastContext.showOverlayPanel(
      <InfoOverlayBase
        titleText={"Step Warning"}
        titleIcon={faExclamationTriangle}
      >
        {`
           This step is either missing configuration settings or needs to be reviewed. 
           In its current state, it will not run properly.  
           Please view the step settings and ensure the required fields are provided and valid.
        `}
      </InfoOverlayBase>
    );
  };

  if (pipelineStep == null || pipelineValidationHelper.isPipelineStepToolValid(pipelineStep?.tool) === true) {
    return null;
  }

  return (
    <OverlayIconBase
      overlayBody={"Warning: Step configuration settings are incomplete!"}
      icon={faExclamationTriangle}
      className={className}
      onClickFunction={launchInfoOverlayPanel}
    />
  );
}

PipelineWorkflowStepIncompleteStepIcon.propTypes = {
  pipelineStep: PropTypes.object,
  className: PropTypes.string,
};
