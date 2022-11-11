import React from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import LdapGroupAssignedRolesToolsTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesToolsTable";
import LdapGroupAssignedRolesTasksTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesTasksTable";
import LdapGroupAssignedRolesPipelinesTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesPipelinesTable";
import LdapGroupAssignedRolesParametersTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesParametersTable";
import LdapGroupAssignedRolesDashboardsTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesDashboardsTable";
import LdapGroupAssignedRolesScriptsTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesScriptsTable";
import LdapGroupAssignedRolesPipelineInstructionsTable
  from "components/settings/ldap_groups/details/roles/tables/LdapGroupAssignedRolesPipelineInstructionsTable";

export default function LdapGroupAssignedRolesTableBase(
  {
    group,
    items,
    isLoading,
    loadData,
    assignedGroupResourcesFilterModel,
  }) {

  const getTable = () => {
    switch (assignedGroupResourcesFilterModel?.getData("type")) {
      case "dashboards":
        return (
          <LdapGroupAssignedRolesDashboardsTable
            dashboards={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "parameters":
        return (
          <LdapGroupAssignedRolesParametersTable
            parameters={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "pipelines":
        return (
          <LdapGroupAssignedRolesPipelinesTable
            pipelines={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "pipeline_instructions":
        return (
          <LdapGroupAssignedRolesPipelineInstructionsTable
            pipelineInstructions={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "scripts":
        return (
          <LdapGroupAssignedRolesScriptsTable
            scripts={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "tools":
        return (
          <LdapGroupAssignedRolesToolsTable
            tools={items}
            isLoading={isLoading}
            group={group}
          />
        );
      case "tasks":
        return (
          <LdapGroupAssignedRolesTasksTable
            tasks={items}
            isLoading={isLoading}
            group={group}
          />
        );
    }
  };

  return (
    <VanityPaginationContainer
      paginationModel={assignedGroupResourcesFilterModel}
      isLoading={isLoading}
      loadData={loadData}
    >
      <div>
        {getTable()}
      </div>
    </VanityPaginationContainer>
  );
}

LdapGroupAssignedRolesTableBase.propTypes = {
  group: PropTypes.string,
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  assignedGroupResourcesFilterModel: PropTypes.object,
};