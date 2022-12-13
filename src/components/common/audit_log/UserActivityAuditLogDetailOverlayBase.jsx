import React from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import UserActivityAuditLogDetailPanel from "components/common/audit_log/UserActivityAuditLogDetailPanel";

export default function UserActivityAuditLogDetailOverlayBase(
  {
    type,
    auditLogModel,
    isLoading,
    setSelectedAuditLogId,
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
            backButtonFunction={() => setSelectedAuditLogId(undefined)}
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

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator type={`Audit Log`} />
      );
    }

    return (
      <UserActivityAuditLogDetailPanel
        auditLogModel={auditLogModel}
      />
    );
  };


  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`${type} Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"pt-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

UserActivityAuditLogDetailOverlayBase.propTypes = {
  type: PropTypes.string,
  auditLogModel: PropTypes.object,
  isLoading: PropTypes.bool,
  setSelectedAuditLogId: PropTypes.func,
};