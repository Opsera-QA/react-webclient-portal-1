import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineDetailsOverview from "components/workflow/pipelines/overview/PipelineDetailsOverview";

function PipelineDetailsOverviewOverlay({ pipeline }) {
  const toastContext = useContext(DialogToastContext);

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
      titleText={`Pipeline Configuration Viewer`}
      titleIcon={faDraftingCompass}
      showToasts={true}
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