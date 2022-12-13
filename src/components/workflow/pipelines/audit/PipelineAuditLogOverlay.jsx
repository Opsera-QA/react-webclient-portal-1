import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineAuditLogsDisplayer from "components/workflow/pipelines/audit/PipelineAuditLogsDisplayer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineAuditLogDetailOverlay from "components/workflow/pipelines/audit/details/PipelineAuditLogDetailOverlay";

export default function PipelineAuditLogOverlay({pipelineId}) {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState(undefined);
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

  if (isMongoDbId(selectedAuditLogId) === true) {
    return (
      <PipelineAuditLogDetailOverlay
        pipelineId={pipelineId}
        selectedAuditLogId={selectedAuditLogId}
        setSelectedAuditLogId={setSelectedAuditLogId}
      />
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Pipeline Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
    >
      <div className={"p-3"}>
        <PipelineAuditLogsDisplayer
          pipelineId={pipelineId}
          setSelectedAuditLogId={setSelectedAuditLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineAuditLogOverlay.propTypes = {
  pipelineId: PropTypes.string
};