import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import UsersTable from "components/settings/users/UsersTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faUserHardHat, faUsers} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import PendingUsersTable from "components/settings/users/PendingUsersTable";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";
import UserManagementHelpDocumentation
  from "../../common/help/documentation/settings/UserManagementHelpDocumentation";
import useGetLdapUsersInCurrentUserDomain from "hooks/ldap/users/useGetLdapUsersInCurrentUserDomain";
import useGetPendingUsers from "hooks/platform/users/useGetPendingUsers";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const {
    userData,
    accessRoleData,
  } = useComponentStateReference();
  const getLdapUsersInCurrentUserDomain = useGetLdapUsersInCurrentUserDomain();
  const getPendingUsers = useGetPendingUsers(
    DataParsingHelper.parseNestedString(userData, "ldap.domain"),
    DataParsingHelper.parseNestedString(userData, "ldap.account"),
  );

  const getBody = () => {
    if (activeTab === "pending") {
      return (
        <PendingUsersTable
          loadData={getPendingUsers.loadData}
          isLoading={getPendingUsers.isLoading}
          pendingUserData={getPendingUsers.pendingUsers}
        />
      );
    }

    return (
      <UsersTable
        orgDomain={DataParsingHelper.parseNestedString(userData, "ldap.domain")}
        isLoading={getLdapUsersInCurrentUserDomain.isLoading}
        users={getLdapUsersInCurrentUserDomain.users}
        loadData={getLdapUsersInCurrentUserDomain.loadData}
      />
    );
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