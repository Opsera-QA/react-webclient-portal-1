import React from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import UserAssignedRolesDashboardsTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesDashboardsTable";
import UserAssignedRolesParametersTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesParametersTable";
import UserAssignedRolesPipelinesTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesPipelinesTable";
import UserAssignedRolesPipelineInstructionsTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesPipelineInstructionsTable";
import UserAssignedRolesScriptsTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesScriptsTable";
import UserAssignedRolesToolsTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesToolsTable";
import UserAssignedRolesTasksTable
  from "components/settings/users/details/assigned_roles/tables/UserAssignedRolesTasksTable";

export default function UserAssignedRolesTableBase(
  {
    userEmailAddress,
    items,
    isLoading,
    loadData,
    assignedGroupResourcesFilterModel,
  }) {

  const getTable = () => {
    switch (assignedGroupResourcesFilterModel?.getData("type")) {
      case "dashboards":
        return (
          <UserAssignedRolesDashboardsTable
            dashboards={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "parameters":
        return (
          <UserAssignedRolesParametersTable
            parameters={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "pipelines":
        return (
          <UserAssignedRolesPipelinesTable
            pipelines={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "pipeline_instructions":
        return (
          <UserAssignedRolesPipelineInstructionsTable
            pipelineInstructions={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "scripts":
        return (
          <UserAssignedRolesScriptsTable
            scripts={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "tools":
        return (
          <UserAssignedRolesToolsTable
            tools={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
          />
        );
      case "tasks":
        return (
          <UserAssignedRolesTasksTable
            tasks={items}
            isLoading={isLoading}
            userEmailAddress={userEmailAddress}
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

UserAssignedRolesTableBase.propTypes = {
  userEmailAddress: PropTypes.string,
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  assignedGroupResourcesFilterModel: PropTypes.object,
};