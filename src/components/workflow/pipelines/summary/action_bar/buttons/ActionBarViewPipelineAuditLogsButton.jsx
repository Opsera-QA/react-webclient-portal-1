import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineAuditLogOverlay from "components/workflow/pipelines/audit/PipelineAuditLogOverlay";

export default function ActionBarViewPipelineAuditLogsButton(
  {
    pipeline,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineAuditLogOverlay
        pipelineId={pipeline?._id}
      />
    );
  };

  if (PipelineRoleHelper.canViewPipelineConfiguration(userData, pipeline) !== true) {
    return null;
  }

  return (
    <ActionBarPopoverButton
      className={"ml-3"}
      icon={faShieldCheck}
      popoverText={`View Pipeline Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ActionBarViewPipelineAuditLogsButton.propTypes = {
  pipeline: PropTypes.object,
};