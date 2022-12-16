import React from "react";
import OptionCardBase from "components/common/card/option/OptionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleActivationConfirmationOverlay
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleActivationConfirmationOverlay";

export default function InactiveAuditorsRolePageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return "This Site Role has not been activated yet. Click it to begin the activation process.";
  };

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <SiteRoleActivationConfirmationOverlay
        siteRoleName={"Auditors"}
      />
    );
  };

  return (
    <OptionCardBase
      // className={className}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
