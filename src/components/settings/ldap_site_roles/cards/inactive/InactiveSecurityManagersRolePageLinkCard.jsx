import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleActivationConfirmationOverlay
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleActivationConfirmationOverlay";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";
import SiteRoleAccessRuleMatrixTable
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleAccessRuleMatrixTable";

export default function InactiveSecurityManagersRolePageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div>{accountSettingsTrails.ldapSecurityManagersSiteRoleDetailView.pageDescription}</div>
        <div className={"mt-2"}>{`This Site Role has not been activated yet. Click here to begin the activation process.`}</div>
      </div>
    );
  };

  const helpOverlayBody = (
    <div>
      <div className={"mb-2"}>The {SiteRoleHelper.getLabelForSiteRole(SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER)} Site Role is an optional Site Role that Site Administrators can enable.</div>
      <div className={"mb-2"}>Users assigned to the {SiteRoleHelper.getLabelForSiteRole(SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER)} Site Role will get these permissions</div>
      <SiteRoleAccessRuleMatrixTable
        siteRole={SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER}
      />
    </div>
  );

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{accountSettingsTrails.ldapSecurityManagersSiteRoleDetailView.title}</div>
      <div>
        <HelpInfoOverlayIcon
          infoOverlay={helpOverlayBody}
          iconSize={"lg"}
          title={"Security Manager Site Role"}
        />
      </div>
    </div>
  );

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <SiteRoleActivationConfirmationOverlay
        siteRoleName={SiteRoleHelper.SITE_ROLE_GROUP_NAMES.SECURITY_MANAGERS}
        siteRole={SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER}
      />
    );
  };

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
