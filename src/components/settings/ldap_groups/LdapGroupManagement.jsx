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

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const [ldapGroupMetadata, setLdapGroupMetadata] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
    getAccessToken,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    setGroupList([]);
    const ldap = DataParsingHelper.parseObject(userData?.ldap, {});

    if (orgDomain == null || (ldap?.domain !== orgDomain && isOpseraAdministrator !== true)) {
      history.push(`/settings/${ldap.domain}/groups`);
    } else {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [orgDomain]);

  const loadData = async () => {
    setGroupList([]);

    try {
      setIsLoading(true);
      if (LdapUserGroupRoleHelper.canGetUserGroupsList(userData) === true) {
        await getGroupsByDomain();
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true && orgDomain != null) {
        setIsLoading(false);
      }
    }
  };

  const getGroupsByDomain = async () => {
    if (orgDomain != null) {
      const response = await accountsActions.getLdapUserGroupsWithDomainV2(
        getAccessToken,
        cancelTokenSource,
        orgDomain,
      );
      const groups = DataParsingHelper.parseArray(response?.data?.data, []);

      if (isMounted?.current === true) {
        const metadata = response?.data?.metadata;
        setLdapGroupMetadata({ ...metadata });
        const existingGroupNames = groups.map((group) => {
          return group.name.toLowerCase();
        });
        setExistingGroupNames(existingGroupNames);
        setGroupList([...groups]);
      }
    }
  };

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
        groupData={groupList}
        isMounted={isMounted}
        ldapGroupMetadata={ldapGroupMetadata}
        loadData={loadData}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
      />
    </ScreenContainer>
  );
}


export default LdapGroupManagement;