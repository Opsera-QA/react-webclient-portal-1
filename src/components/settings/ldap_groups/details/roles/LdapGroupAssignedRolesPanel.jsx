import PropTypes from "prop-types";
import React from "react";
import {
  faIdCard,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer, {
  DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
} from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import LdapGroupAssignedRolesTabContainer
  from "components/settings/ldap_groups/details/roles/LdapGroupAssignedRolesTabContainer";
import useGetResourcesByAssignedGroup
  from "components/settings/ldap_groups/details/roles/hooks/useGetResourcesByAssignedGroup";
import LdapGroupAssignedRolesTableBase
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesTableBase";

const height = `calc(${DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT} - 110px)`;

export default function LdapGroupAssignedRolesPanel(
  {
    groupModel,
  }) {
  const {
    assignedResources,
    assignedGroupResourcesFilterModel,
    isLoading,
    loadData,
    error,
  } = useGetResourcesByAssignedGroup(groupModel?.getData("name"));

  return (
    <VanitySetTabAndViewContainer
      title={"Assigned Role Group Resources"}
      className={"mt-2"}
      icon={faIdCard}
      minimumHeight={height}
      loadDataFunction={loadData}
      maximumHeight={height}
      tabColumnSize={3}
      verticalTabContainer={
        <LdapGroupAssignedRolesTabContainer
          isLoading={isLoading}
          loadData={loadData}
          assignedRoleFilterModel={assignedGroupResourcesFilterModel}
        />
      }
      isLoading={isLoading}
      currentView={
        <LdapGroupAssignedRolesTableBase
          assignedGroupResourcesFilterModel={assignedGroupResourcesFilterModel}
          items={assignedResources}
          isLoading={isLoading}
          loadData={loadData}
          group={groupModel?.getData("name")}
        />
      }
    />
  );
}

LdapGroupAssignedRolesPanel.propTypes = {
  isLoading: PropTypes.bool,
  groupModel: PropTypes.object,
  assignedRoleFilterModel: PropTypes.object,
};