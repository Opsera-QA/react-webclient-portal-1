import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleActivationConfirmationOverlay
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleActivationConfirmationOverlay";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import SiteRoleAccessRuleMatrixTable
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleAccessRuleMatrixTable";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";

export default function InactiveAuditorsRolePageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {SiteRoleHelper.getLabelForSiteRole(SiteRoleHelper.SITE_ROLES.AUDITOR)} Site Role is an optional Site Role that Site Administrators can enable.</div>
        <div>{accountSettingsTrails.ldapAuditorsSiteRoleDetailView.pageDescription}</div>
        <div className={"mt-2"}>{`This Site Role has not been activated yet. Click here to begin the activation process.`}</div>
      </div>
    );
  };

  const helpOverlayBody = (
    <div>
      <div className={"mb-2"}>Users assigned to the {SiteRoleHelper.getLabelForSiteRole(SiteRoleHelper.SITE_ROLES.AUDITOR)} Site Role will get these permissions</div>
      <SiteRoleAccessRuleMatrixTable
        siteRole={SiteRoleHelper.SITE_ROLES.AUDITOR}
      />
    </div>
  );

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{accountSettingsTrails.ldapAuditorsSiteRoleDetailView.title}</div>
      <div>
        <HelpInfoOverlayIcon
          infoOverlay={helpOverlayBody}
          iconSize={"lg"}
          title={"Auditor Site Role"}
        />
      </div>
    </div>
  );


  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <SiteRoleActivationConfirmationOverlay
        siteRoleName={SiteRoleHelper.SITE_ROLE_GROUP_NAMES.AUDITORS}
        siteRole={SiteRoleHelper.SITE_ROLES.AUDITOR}
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
