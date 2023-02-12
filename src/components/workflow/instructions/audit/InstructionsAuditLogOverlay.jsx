import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import InstructionsAuditLogDetailOverlay
  from "components/workflow/instructions/audit/details/InstructionsAuditLogDetailOverlay";
import InstructionsAuditLogsDisplayer from "components/workflow/instructions/audit/InstructionsAuditLogsDisplayer";

export default function InstructionsAuditLogOverlay({instructionsId}) {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (instructionsId == null) {
    return null;
  }

  if (isMongoDbId(selectedAuditLogId) === true) {
    return (
      <InstructionsAuditLogDetailOverlay
        instructionsId={instructionsId}
        selectedAuditLogId={selectedAuditLogId}
        setSelectedAuditLogId={setSelectedAuditLogId}
      />
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Instructions Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
    >
      <div className={"p-3"}>
        <InstructionsAuditLogsDisplayer
          instructionsId={instructionsId}
          setSelectedAuditLogId={setSelectedAuditLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

InstructionsAuditLogOverlay.propTypes = {
  instructionsId: PropTypes.string
};