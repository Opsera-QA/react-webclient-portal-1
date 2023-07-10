import React, {useState} from "react";
import UsersTable from "components/settings/users/UsersTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faUserHardHat, faUsers, faUsersSlash} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import PendingUsersTable from "components/settings/users/PendingUsersTable";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";
import UserManagementHelpDocumentation
  from "../../common/help/documentation/settings/UserManagementHelpDocumentation";
import useGetLdapUsersInCurrentUserDomain from "hooks/ldap/users/useGetLdapUsersInCurrentUserDomain";
import useGetPendingUsers from "hooks/platform/users/useGetPendingUsers";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetDeactivatedLdapUsersInCurrentUserDomain
  from "hooks/ldap/users/useGetDeactivatedLdapUsersInCurrentUserDomain";
import DeactivatedUsersTable from "components/settings/users/DeactivatedUsersTable";

const USER_MANAGEMENT_VIEWS = {
  PENDING_USERS: "pending",
  ACTIVE_USERS: "active",
  DEACTIVATED_USERS: "deactivated",
};

function UserManagement() {
  const [activeTab, setActiveTab] = useState(USER_MANAGEMENT_VIEWS.ACTIVE_USERS);
  const {
    userData,
    accessRoleData,
  } = useComponentStateReference();
  const getLdapUsersInCurrentUserDomain = useGetLdapUsersInCurrentUserDomain();
  const getDeactivatedLdapUsersInCurrentUserDomain = useGetDeactivatedLdapUsersInCurrentUserDomain();
  const getPendingUsers = useGetPendingUsers(
    DataParsingHelper.parseNestedString(userData, "ldap.domain"),
    DataParsingHelper.parseNestedString(userData, "ldap.account"),
  );

  const getBody = () => {
    switch (activeTab) {
      case USER_MANAGEMENT_VIEWS.PENDING_USERS:
        return (
          <PendingUsersTable
            loadData={getPendingUsers.loadData}
            isLoading={getPendingUsers.isLoading}
            pendingUserData={getPendingUsers.pendingUsers}
          />
        );
      case USER_MANAGEMENT_VIEWS.DEACTIVATED_USERS:
        return (
          <DeactivatedUsersTable
            isLoading={getDeactivatedLdapUsersInCurrentUserDomain.isLoading}
            users={getDeactivatedLdapUsersInCurrentUserDomain.users}
            loadData={getDeactivatedLdapUsersInCurrentUserDomain.loadData}
          />
        );
      case USER_MANAGEMENT_VIEWS.ACTIVE_USERS:
        return (
          <UsersTable
            orgDomain={DataParsingHelper.parseNestedString(userData, "ldap.domain")}
            isLoading={getLdapUsersInCurrentUserDomain.isLoading}
            users={getLdapUsersInCurrentUserDomain.users}
            loadData={getLdapUsersInCurrentUserDomain.loadData}
          />
        );
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
          tabText={"Active Users"}
          handleTabClick={handleTabClick}
          tabName={USER_MANAGEMENT_VIEWS.ACTIVE_USERS}
          icon={faUsers}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Deactivated Users"}
          handleTabClick={handleTabClick}
          tabName={USER_MANAGEMENT_VIEWS.DEACTIVATED_USERS}
          icon={faUsersSlash}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Pending Users"}
          handleTabClick={handleTabClick}
          tabName={USER_MANAGEMENT_VIEWS.PENDING_USERS}
          icon={faUserHardHat}
        />
      </CustomTabContainer>
    );
  };

  const getHelpComponent = () => {
    return (<UserManagementHelpDocumentation/>);
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"userManagement"}
      helpComponent={getHelpComponent()}
      isLoading={!accessRoleData}
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