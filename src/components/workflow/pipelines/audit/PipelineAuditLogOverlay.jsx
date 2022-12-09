import React from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineAuditLogsDisplayer from "components/workflow/pipelines/audit/PipelineAuditLogsDisplayer";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineAuditLogOverlay({ pipelineId }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (pipelineId == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Pipeline Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
    >
      <div className={"p-3"}>
        <PipelineAuditLogsDisplayer pipelineId={pipelineId} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineAuditLogOverlay.propTypes = {
  pipelineId: PropTypes.string
};