import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faCog} from "@fortawesome/pro-light-svg-icons";
//import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
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
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={`Pipeline Step Settings: ${pipelineStepData?.name}`}
      titleIcon={faCog}
      showToasts={true}
    >
      <div className={"p-3"}>
        <PipelineStepTabPanel
          pipelineStepData={pipelineStepData}
        />
      </div>
    </CenterOverlayContainer>
  );
}

PipelineStepDetailsOverviewOverlay.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepDetailsOverviewOverlay;