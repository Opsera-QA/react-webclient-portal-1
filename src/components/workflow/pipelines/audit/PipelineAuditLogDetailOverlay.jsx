import React from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineAuditLogSummaryPanel from "components/workflow/pipelines/audit/PipelineAuditLogSummaryPanel";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";

export default function PipelineAuditLogDetailOverlay(
  {
    pipelineId,
    selectedActivityLogId,
    setSelectedActivityLogId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase
        className={"p-3"}
        leftSideButtons={
          <BackButtonBase
            size={"sm"}
            backButtonFunction={() => setSelectedActivityLogId(undefined)}
          />
        }
      >
        <CloseButton
          size={"sm"}
          closeEditorCallback={closePanel}
          showUnsavedChangesMessage={false}
        />
      </ButtonContainerBase>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Pipeline Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        <PipelineAuditLogSummaryPanel
          pipelineId={pipelineId}
          auditLogId={selectedActivityLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineAuditLogDetailOverlay.propTypes = {
  pipelineId: PropTypes.string,
  selectedActivityLogId: PropTypes.string,
  setSelectedActivityLogId: PropTypes.func,
};