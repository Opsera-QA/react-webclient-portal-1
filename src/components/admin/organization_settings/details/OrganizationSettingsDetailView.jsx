import React from "react";
import { useParams } from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapOrganizationAccountOrganizationSettings
  from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccountOrganizationSettings";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";

function OrganizationSettingsDetailView() {
  const { organizationDomain, organizationAccount, } = useParams();
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    organizationSettings,
    error,
    isLoading,
    loadData,
  } = useGetLdapOrganizationAccountOrganizationSettings(
    organizationDomain,
    organizationAccount,
  );

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={organizationSettingsHelper.getManagementScreenLink()}/>
        </div>
        <div className="d-flex">
          {/*<TagSubscriptionIcon*/}
          {/*  tagModel={tagModel}*/}
          {/*  className={"ml-3"}*/}
          {/*/>*/}
          {/*<DeleteTagActionBarButton*/}
          {/*  tagModel={tagModel}*/}
          {/*  className={"ml-3"}*/}
          {/*/>*/}
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"tagDetailView"}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<TagManagementSubNavigationBar activeTab={"tagViewer"} />}
      dataObject={organizationSettings}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={JSON.stringify(organizationSettings)
      // <TagDetailPanel setTagData={setTagModel} tagData={tagModel} accessRoleData={accessRoleData} />
    }
    />
  );
}

export default OrganizationSettingsDetailView;