import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import InstructionsAuditLogOverlay from "components/workflow/instructions/audit/InstructionsAuditLogOverlay";

export default function ViewInstructionsAuditLogsActionBarButton(
  {
    instructionsModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <InstructionsAuditLogOverlay
        instructionsId={instructionsModel?.getMongoDbId()}
      />
    );
  };

  // TODO: Add RBAC check?
  if (instructionsModel == null) {
    return null;
  }

  return (
    <ActionBarPopoverButton
      className={className}
      icon={faShieldCheck}
      popoverText={`View Instructions Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ViewInstructionsAuditLogsActionBarButton.propTypes = {
  instructionsModel: PropTypes.object,
  className: PropTypes.string,
};