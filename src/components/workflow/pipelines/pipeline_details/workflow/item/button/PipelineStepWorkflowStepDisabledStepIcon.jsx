import React from "react";
import PropTypes from "prop-types";
import {faBan, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import InfoOverlayBase from "components/common/overlays/info/InfoOverlayBase";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function PipelineStepWorkflowStepDisabledStepIcon(
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
           This step is currently disabled and will be skipped during a pipeline run.  
           If you have sufficient access, you can enable this step by clicking the edit workflow button at the top and then edit the step's configuration (via the pipeline step editor icon at the top) and mark the step as Active.
        `}
      </InfoOverlayBase>
    );
  };

  if (pipelineStep?.active !== false) {
    return null;
  }

  return (
    <OverlayIconBase
      overlayBody={"This step is currently disabled"}
      icon={faBan}
      className={className}
      onClickFunction={launchInfoOverlayPanel}
    />
  );
}

PipelineStepWorkflowStepDisabledStepIcon.propTypes = {
  pipelineStep: PropTypes.object,
  className: PropTypes.string,
};
