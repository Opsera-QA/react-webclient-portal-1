import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import UsersTable from "components/settings/users/UsersTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faUserHardHat, faUsers} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import PendingUsersTable from "components/settings/users/PendingUsersTable";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";

function UserManagement() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [ldapDomain, setLdapDomain] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab, setActiveTab] = useState("users");

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
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUsersByDomain = async (ldapDomain, cancelSource = cancelTokenSource) => {
    try {
      let organizationResponse = await accountsActions.getOrganizationAccountByDomainV2(getAccessToken, cancelSource, ldapDomain);
      if (isMounted?.current === true && organizationResponse?.data?.users) {
        setUsers(organizationResponse?.data?.users);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess && ldap?.domain) {
      setLdapDomain(ldap?.domain);
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, undefined, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      await getUsersByDomain(ldap?.domain, cancelSource);
      await getPendingUsers(cancelSource, ldap?.domain, ldap?.account);
    }
  };

  const getBody = () => {
    if (activeTab === "pending") {
      return (
        <PendingUsersTable
          loadData={loadData}
          isLoading={isLoading}
          pendingUserData={pendingUsers}
        />
      );
    }

    return (
      <UsersTable
        orgDomain={ldapDomain}
        isLoading={isLoading}
        userData={users}
        loadData={loadData}
        authorizedActions={authorizedActions}
        isMounted={isMounted}
      />
    );
  };

  const getPendingUsers = async (cancelSource = cancelTokenSource, ldapDomain, ldapAccount) => {
    const response = await accountsActions.getPendingUsersV2(getAccessToken, cancelSource, ldapDomain, ldapAccount);
    const users = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(users)) {
      setPendingUsers(users);
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Users"}
          handleTabClick={handleTabClick}
          tabName={"users"}
          icon={faUsers}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Pending Users"}
          handleTabClick={handleTabClick}
          tabName={"pending"}
          icon={faUserHardHat}
        />
      </CustomTabContainer>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"userManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<UserManagementSubNavigationBar activeTab={"users"} />}
      pageDescription={"Manage existing users as well as register new users for this account.  The new user form allows owners to create new user accounts with targeted group access. Users will receive an invitation email upon completion of the form."}
    >
      <div className="px-3">
        <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}


export default UserManagement;