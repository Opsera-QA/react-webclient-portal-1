import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {faServer, faUsers} from "@fortawesome/pro-light-svg-icons";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [activeTab, setActiveTab] = useState("userGroups");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, [orgDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error)
      }
    }
    finally {
      if (isMounted?.current === true && orgDomain != null) {
        setIsLoading(false);
      }
    }
  }

  const getGroupsByDomain = async (ldapDomain, cancelSource = cancelTokenSource) => {
    if (ldapDomain != null) {
      try {
        let response = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldapDomain);

        if (response?.data) {
          let existingGroups = response?.data;
          const existingGroupNames = existingGroups.map((group) => {return group.name.toLowerCase()});
          setExistingGroupNames(existingGroupNames);
          setGroupList(existingGroups);
        }
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;

    if (isMounted?.current === true && userRoleAccess) {
      setCurrentUserEmail(user?.email);
      if (orgDomain == null || (ldap?.domain !== orgDomain && !userRoleAccess?.OpseraAdministrator)) {
        history.push(`/settings/${ldap.domain}/groups`);
      }

      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap?.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator || authorizedActions?.includes("get_groups")) {
        await getGroupsByDomain(orgDomain, cancelSource);
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
            existingGroupNames={existingGroupNames}
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
          disabled={accessRoleData && (!accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator)}
          tabText={"Site Roles & Departments"} />
      </NavigationTabContainer>
    );
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"ldapGroupManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}


export default LdapGroupManagement;