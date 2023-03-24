import { useEffect, useState } from "react";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";
import AssignedRoleFilterModel from "components/settings/ldap_groups/details/roles/assignedRole.filter.model";

export default function useGetResourcesByAssignedUser(
  userEmailAddress,
  onErrorFunction,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [assignedUserResourcesFilterModel, setAssignedUserRoleFilterModel] = useState(new AssignedRoleFilterModel());
  const [assignedResources, setAssignedResources] = useState([]);
  const [error, setError] = useState(undefined);
  const ldapUserActions = useLdapUserActions();

  useEffect(() => {
    setAssignedResources([]);
    setError(undefined);

    if (hasStringValue(userEmailAddress) === true) {
      loadData().catch(() => {});
    }
  }, [userEmailAddress]);

  const loadData = async (newFilterModel = assignedUserResourcesFilterModel) => {
    try {
      setIsLoading(true);
      if (hasStringValue(userEmailAddress) === true) {
        await getUserEmailAddressRoleAssignedTools(newFilterModel);
      }
    } catch (error) {
      setError(error);

      if (onErrorFunction) {
        onErrorFunction(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserEmailAddressRoleAssignedTools = async (newFilterModel = assignedUserResourcesFilterModel) => {
    const response = await ldapUserActions.getResourcesWithUserAssigned(
      userEmailAddress,
      newFilterModel?.getData("type"),
    );
    console.log("response: " + JSON.stringify(response));

    const resources = DataParsingHelper.parseArray(response?.data?.data, []);
    setAssignedResources([...resources]);
  };

  return ({
    assignedResources: assignedResources,
    setAssignedResources: setAssignedResources,
    assignedUserResourcesFilterModel: assignedUserResourcesFilterModel,
    setAssignedUserRoleFilterModel: setAssignedUserRoleFilterModel,
    error: error,
    loadData: loadData,
    isLoading: isLoading,
  });
}
