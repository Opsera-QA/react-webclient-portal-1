import PropTypes from "prop-types";
import React from "react";
import {
  faIdCard,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer, {
  DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
} from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import useGetResourcesByAssignedUser from "hooks/ldap/users/assigned_resources/useGetResourcesByAssignedUser";
import UserAssignedRolesTabContainer
  from "components/settings/users/details/assigned_roles/UserAssignedRolesTabContainer";
import UserAssignedRolesTableBase
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesTableBase";
import LaunchRevokeUserAccessRulesOverlayButton
  from "components/settings/users/details/assigned_roles/revoke/LaunchRevokeUserAccessRulesOverlayButton";

const height = `calc(${DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT} - 110px)`;

export default function UserAssignedRolesPanel(
  {
    userEmailAddress,
  }) {
  const {
    assignedResources,
    assignedUserResourcesFilterModel,
    isLoading,
    loadData,
    error,
  } = useGetResourcesByAssignedUser(userEmailAddress);

  return (
    <VanitySetTabAndViewContainer
      title={"Assigned Role User Resources"}
      className={"mt-2"}
      icon={faIdCard}
      minimumHeight={height}
      loadDataFunction={loadData}
      maximumHeight={height}
      tabColumnSize={3}
      titleRightSideButton={
        <LaunchRevokeUserAccessRulesOverlayButton
          userEmailAddress={userEmailAddress}
          loadData={loadData}
        />
      }
      verticalTabContainer={
        <UserAssignedRolesTabContainer
          isLoading={isLoading}
          loadData={loadData}
          assignedRoleFilterModel={assignedUserResourcesFilterModel}
        />
      }
      isLoading={isLoading}
      currentView={
        <UserAssignedRolesTableBase
          assignedGroupResourcesFilterModel={assignedUserResourcesFilterModel}
          items={assignedResources}
          isLoading={isLoading}
          loadData={loadData}
          userEmailAddress={userEmailAddress}
        />
      }
    />
  );
}

UserAssignedRolesPanel.propTypes = {
  userEmailAddress: PropTypes.string,
};