import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import CustomerPipelineTemplateAuditLogOverlay
  from "components/workflow/catalog/private/audit/CustomerPipelineTemplateAuditLogOverlay";

export default function ViewCustomerPipelineTemplateAuditLogsActionBarButton(
  {
    templateModel,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <CustomerPipelineTemplateAuditLogOverlay
        templateId={templateModel?.getMongoDbId()}
      />
    );
  };

  return (
    <ActionBarPopoverButton
      className={className}
      icon={faShieldCheck}
      popoverText={`View Pipeline Template Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ViewCustomerPipelineTemplateAuditLogsActionBarButton.propTypes = {
  templateModel: PropTypes.object,
  className: PropTypes.string,
};