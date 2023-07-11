import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
//import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import PipelineSummaryAndWebhookOverviewDetailPanel from "components/workflow/pipelines/overview/PipelineSummaryAndWebhookOverviewDetailPanel";

function PipelineSourceConfigurationDetailsOverviewOverlay({ pipeline }) {
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

  if (pipeline == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={`Pipeline Details`}
      titleIcon={faDraftingCompass}
      showToasts={true}
    >
      <div className={"p-3"}>
        <PipelineSummaryAndWebhookOverviewDetailPanel pipeline={pipeline} />
      </div>
    </CenterOverlayContainer>
  );
}

PipelineSourceConfigurationDetailsOverviewOverlay.propTypes = {
  pipeline: PropTypes.object,
};

export default PipelineSourceConfigurationDetailsOverviewOverlay;