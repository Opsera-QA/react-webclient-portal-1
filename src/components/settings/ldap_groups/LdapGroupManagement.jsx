import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {faServer, faUsers} from "@fortawesome/pro-light-svg-icons";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [activeTab, setActiveTab] = useState("userGroups");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    loadData();
  }, [orgDomain]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const getGroupsByDomain = async (ldapDomain) => {
    if (ldapDomain != null) {
      try {
        let response = await accountsActions.getLdapGroupsWithDomain(ldapDomain, getAccessToken);
        setGroupList(response?.data);
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    setCurrentUserEmail(user?.email);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap?.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (orgDomain != null && userRoleAccess?.OpseraAdministrator) {
        await getGroupsByDomain(orgDomain);
      } else if (ldap.domain != null && authorizedActions?.includes("get_groups")) {
        history.push(`/settings/${ldap.domain}/groups`);
        await getGroupsByDomain(ldap.domain);
      }
    }
  };

  const parseUsersGroups = () => {
    return Array.isArray(groupList) && groupList.filter((group) => {return group.groupType === "user"});
  };

  const parseAdminGroups = () => {
    return Array.isArray(groupList) && groupList.filter((group) => {return group.groupType !== "user"});
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "userGroups":
        return (
          <LdapGroupsTable
            isLoading={isLoading}
            groupData={parseUsersGroups()}
            loadData={loadData}
            orgDomain={orgDomain}
            authorizedActions={authorizedActions}
            currentUserEmail={currentUserEmail}
          />
        );
      case "adminGroups":
        return (
          <LdapGroupsTable
            isLoading={isLoading}
            groupData={parseAdminGroups()}
            loadData={loadData}
            orgDomain={orgDomain}
            currentUserEmail={currentUserEmail}
          />
        );
      default:
        return null;
    }
  }

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faUsers} tabName={"userGroups"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"User Groups"} />
        <NavigationTab
          icon={faServer}
          tabName={"adminGroups"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          disabled={!accessRoleData || (!accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator)}
          tabText={"Site Roles & Departments"} />
      </NavigationTabContainer>
    );
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={getNavigationTabContainer()}
      accessDenied={!authorizedActions.includes("get_groups")}
      breadcrumbDestination={"ldapGroupManagement"}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}


export default LdapGroupManagement;