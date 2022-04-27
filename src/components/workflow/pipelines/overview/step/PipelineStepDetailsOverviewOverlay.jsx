import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineStepTabPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepTabPanel";

function PipelineStepDetailsOverviewOverlay({ pipelineStepData }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (pipelineStepData == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`${pipelineStepData?.name} Pipeline Step Summary`}
      titleIcon={faDraftingCompass}
      showToasts={true}
    >
      <div className={"p-3"}>
        <PipelineStepTabPanel
          pipelineStepData={pipelineStepData}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineStepDetailsOverviewOverlay.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepDetailsOverviewOverlay;