import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformPipelineTemplateAuditLogOverlay
  from "components/workflow/catalog/platform/audit/PlatformPipelineTemplateAuditLogOverlay";

export default function ViewPlatformPipelineTemplateAuditLogsActionBarButton(
  {
    templateModel,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <PlatformPipelineTemplateAuditLogOverlay
        templateId={templateModel?.getMongoDbId()}
      />
    );
  };

  return (
    <ActionBarPopoverButton
      className={"ml-3"}
      icon={faShieldCheck}
      popoverText={`View Pipeline Template Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ViewPlatformPipelineTemplateAuditLogsActionBarButton.propTypes = {
  templateModel: PropTypes.object,
};