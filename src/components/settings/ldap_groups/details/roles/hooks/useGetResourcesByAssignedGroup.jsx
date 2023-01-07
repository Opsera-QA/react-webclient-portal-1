import { useEffect, useState } from "react";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AssignedGroupRoleFilterModel from "components/settings/ldap_groups/details/roles/assignedGroupRole.filter.model";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";

export default function useGetResourcesByAssignedGroup(
  group,
  onErrorFunction,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [assignedGroupResourcesFilterModel, setAssignedGroupRoleFilterModel] = useState(new AssignedGroupRoleFilterModel());
  const [assignedResources, setAssignedResources] = useState([]);
  const [error, setError] = useState(undefined);
  const ldapGroupActions = useLdapGroupActions();

  useEffect(() => {
    setAssignedResources([]);
    setError(undefined);

    if (hasStringValue(group) === true) {
      loadData().catch(() => {});
    }
  }, [group]);

  const loadData = async (newFilterModel = assignedGroupResourcesFilterModel) => {
    try {
      setIsLoading(true);
      await getGroupRoleAssignedTools(newFilterModel);
    } catch (error) {
      setError(error);

      if (onErrorFunction) {
        onErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupRoleAssignedTools = async (newFilterModel = assignedGroupResourcesFilterModel) => {
    const response = await ldapGroupActions.getResourcesWithGroupAssigned(
      group,
      newFilterModel?.getData("type"),
    );

    const resources = DataParsingHelper.parseArray(response?.data?.data, []);
    setAssignedResources([...resources]);
  };

  return ({
    assignedResources: assignedResources,
    setAssignedResources: setAssignedResources,
    assignedGroupResourcesFilterModel: assignedGroupResourcesFilterModel,
    setAssignedGroupRoleFilterModel: setAssignedGroupRoleFilterModel,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
