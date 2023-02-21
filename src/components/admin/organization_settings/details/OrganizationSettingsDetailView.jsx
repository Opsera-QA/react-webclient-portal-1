import React from "react";
import { useParams } from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import OrganizationSettingsManagementSubNavigationBar
  from "components/admin/organization_settings/OrganizationSettingsManagementSubNavigationBar";
import OrganizationSettingsDetailPanel
  from "components/admin/organization_settings/details/OrganizationSettingsDetailPanel";
import useGetLdapOrganizationAccountOrganizationSettingsModel
  from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccountOrganizationSettingsModel";
import organizationSettingsMetadata
  from "@opsera/definitions/constants/settings/organization-settings/organizationSettings.metadata";

function OrganizationSettingsDetailView() {
  const { organizationDomain, organizationAccount, } = useParams();
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    organizationSettingsModel,
    setOrganizationSettingsModel,
    error,
    isLoading,
    loadData,
  } = useGetLdapOrganizationAccountOrganizationSettingsModel(
    organizationDomain,
    organizationAccount,
  );

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={organizationSettingsHelper.getManagementScreenLink()}/>
        </div>
      </ActionBarContainer>
    );
  };

  if (isLoading) {
    return (
      <CenterLoadingIndicator />
    );
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationSettingsDetailView"}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      metadata={organizationSettingsMetadata}
      accessRoleData={accessRoleData}
      navigationTabContainer={<OrganizationSettingsManagementSubNavigationBar activeTab={"ldapOrganizationSettingsViewer"} />}
      dataObject={organizationSettingsModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <OrganizationSettingsDetailPanel
          organizationSettingsModel={organizationSettingsModel}
          setOrganizationSettingsModel={setOrganizationSettingsModel}
        />
      }
    />
  );
}

export default OrganizationSettingsDetailView;