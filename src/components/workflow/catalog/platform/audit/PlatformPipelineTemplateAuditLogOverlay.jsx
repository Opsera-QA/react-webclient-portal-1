import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CustomerPipelineTemplateAuditLogDetailOverlay
  from "components/workflow/catalog/private/audit/CustomerPipelineTemplateAuditLogDetailOverlay";
import PlatformPipelineTemplateAuditLogsDisplayer
  from "components/workflow/catalog/platform/audit/PlatformPipelineTemplateAuditLogsDisplayer";

export default function PlatformPipelineTemplateAuditLogOverlay({templateId}) {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (templateId == null) {
    return null;
  }

  if (isMongoDbId(selectedAuditLogId) === true) {
    return (
      <CustomerPipelineTemplateAuditLogDetailOverlay
        templateId={templateId}
        selectedAuditLogId={selectedAuditLogId}
        setSelectedAuditLogId={setSelectedAuditLogId}
      />
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Platform Pipeline Template Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
      showCloseBackButton={true}
    >
      <div className={"p-3"}>
        <PlatformPipelineTemplateAuditLogsDisplayer
          templateId={templateId}
          setSelectedAuditLogId={setSelectedAuditLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PlatformPipelineTemplateAuditLogOverlay.propTypes = {
  templateId: PropTypes.string
};