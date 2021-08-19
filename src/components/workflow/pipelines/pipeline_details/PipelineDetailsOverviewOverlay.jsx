import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineDetailsOverview from "components/workflow/pipelines/pipeline_details/PipelineDetailsOverview";

function PipelineDetailsOverviewOverlay({ pipeline }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
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

  if (pipeline == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`[${pipeline?.name}] Pipeline Details`}
      titleIcon={faDraftingCompass}
      showToasts={true}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
        <PipelineDetailsOverview pipeline={pipeline} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineDetailsOverviewOverlay.propTypes = {
  pipeline: PropTypes.object
};

export default PipelineDetailsOverviewOverlay;