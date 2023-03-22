import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import GroupManagementSubNavigationBar from "components/settings/ldap_groups/GroupManagementSubNavigationBar";
import GroupsHelpDocumentation from "../../common/help/documentation/settings/GroupsHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import LdapUserGroupRoleHelper from "@opsera/know-your-role/roles/accounts/groups/user/ldapUserGroupRole.helper";
import useGetLdapGroupsForDomain from "hooks/ldap/groups/useGetLdapGroupsForDomain";

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
    getAccessToken,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    loadData,
    groups,
    isLoading,
  } = useGetLdapGroupsForDomain(orgDomain);

  useEffect(() => {
    const domain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (orgDomain == null || (domain !== orgDomain && isOpseraAdministrator !== true)) {
      history.push(`/settings/${domain}/groups`);
    }

  }, [orgDomain]);

  useEffect(() => {
    const existingGroupNames = groups.map((group) => {
      return group.name.toLowerCase();
    });

    setExistingGroupNames(existingGroupNames);

  }, [groups]);

  if (LdapUserGroupRoleHelper.canGetUserGroupsList(userData) !== true) {
    return null;
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={<GroupManagementSubNavigationBar activeTab={"groups"} />}
      breadcrumbDestination={"ldapGroupManagement"}
      pageDescription={"Group Management allows users to manage membership for existing groups and create new groups. These groups are the custom groups that users can create, manage and apply to individual items, like Pipelines and Tools."}
      helpComponent={<GroupsHelpDocumentation/>}
    >
      <LdapGroupsTable
        className={"mx-2"}
        isLoading={isLoading}
        groupData={groups}
        isMounted={isMounted}
        loadData={loadData}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
      />
    </ScreenContainer>
  );
}


export default LdapGroupManagement;