import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ToolAuditLogsDisplayer from "components/inventory/tools/audit/ToolAuditLogsDisplayer";
import ToolAuditLogDetailOverlay from "components/inventory/tools/audit/details/ToolAuditLogDetailOverlay";

export default function ToolAuditLogOverlay({toolId}) {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (toolId == null) {
    return null;
  }

  if (isMongoDbId(selectedAuditLogId) === true) {
    return (
      <ToolAuditLogDetailOverlay
        toolId={toolId}
        selectedAuditLogId={selectedAuditLogId}
        setSelectedAuditLogId={setSelectedAuditLogId}
      />
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Tool Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
    >
      <div className={"p-3"}>
        <ToolAuditLogsDisplayer
          toolId={toolId}
          setSelectedAuditLogId={setSelectedAuditLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

ToolAuditLogOverlay.propTypes = {
  toolId: PropTypes.string
};