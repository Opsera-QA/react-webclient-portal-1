import React from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import OrganizationDetailPanel
  from "components/settings/organizations/organization_detail_view/OrganizationDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import useGetOrganizationModelById from "hooks/settings/insights/organizations/useGetOrganizationModelById";
import {organizationHelper} from "components/settings/organizations/organization.helper";
import {useParams} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteOrganizationActionBarButton
  from "components/settings/organizations/actions/DeleteOrganizationActionBarButton";
import OrganizationRoleHelper from "@opsera/know-your-role/roles/settings/organizations/organizationRole.helper";

export default function OrganizationDetailView() {
  const {id} = useParams();
  const {
    organizationModel,
    setOrganizationModel,
    isLoading,
  } = useGetOrganizationModelById(id);
  const {
    userData,
  } = useComponentStateReference();

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={organizationHelper.getManagementScreenLink()}/>
        </div>
        <div>
          <DeleteOrganizationActionBarButton
            organizationModel={organizationModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  if (OrganizationRoleHelper.canGetOrganizationList(userData) !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"organizationDetailView"}
      metadata={organizationMetadata}
      dataObject={organizationModel}
      navigationTabContainer={<OrganizationsSubNavigationBar activeTab={"organizationViewer"}/>}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<OrganizationDetailPanel organizationData={organizationModel}/>}
    />
  );
}
