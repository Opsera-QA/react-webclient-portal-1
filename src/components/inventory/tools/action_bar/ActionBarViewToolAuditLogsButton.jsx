import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolAuditLogOverlay from "components/inventory/tools/audit/ToolAuditLogOverlay";

export default function ActionBarViewToolAuditLogsButton(
  {
    toolModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <ToolAuditLogOverlay
        toolId={toolModel?.getMongoDbId()}
      />
    );
  };

  // TODO: Add RBAC check?
  if (toolModel == null) {
    return null;
  }

  return (
    <ActionBarPopoverButton
      className={className}
      icon={faShieldCheck}
      popoverText={`View Tool Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ActionBarViewToolAuditLogsButton.propTypes = {
  toolModel: PropTypes.object,
  className: PropTypes.string,
};