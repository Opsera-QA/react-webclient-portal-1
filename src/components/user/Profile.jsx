import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/pro-light-svg-icons";
import { defineUserRole } from "utils/helpers";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import LoadingDialog from "components/common/status_notifications/loading";

function Profile() {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accessRoleLabel, setAccessRoleLabel] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchData();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    const user = await getUserRecord();
    setUser(user);

    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      const userRole = defineUserRole(userRoleAccess.Role);
      setAccessRoleLabel(userRole);
    }
  };

  const syncUserData = async () => {
    setIsSyncing(true);
    try {
      await userActions.syncUser(getAccessToken);
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const getLdapUserInfo = () => {
    return (
      <tr>
        <td>Organization & Account</td>
        <td>
          <div className="pb-1"><span className="text-muted mr-2">Organization:</span> {user.ldap.organization}</div>
          <div className="pb-1"><span className="text-muted mr-2">Account:</span> {user.ldap.account}</div>
          <div className="pb-1"><span className="text-muted mr-2">Domain:</span> {user.ldap.domain}</div>
          <div className="pb-1"><span className="text-muted mr-2">Division:</span> {user.ldap.division}</div>
          <div className="pb-1"><span
            className="text-muted mr-2">Account Owner:</span> {user.ldap.orgAccountOwnerEmail}</div>
          <div className="pb-1"><span className="text-muted mr-2">Account Type:</span> {user.ldap.type}</div>
        </td>
      </tr>
    );
  };

  // TODO: Style better
  const getUserInfo = () => {
    if (user == null) {
      return <></>;
    }

    return (
      <div>
        <Table className="custom-table mb-0">
          <tbody>
          <tr>
            <td>OpsERA User ID</td>
            <td>{user._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user.firstName} {user.lastName}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Job Title</td>
            <td>{user.title}</td>
          </tr>
          <tr>
            <td>Organization</td>
            <td>{user.organizationName}</td>
          </tr>
          <tr>
            <td>Platform SubDomain</td>
            <td>{user.domain}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{user.createdAt}</td>
          </tr>
          <tr>
            <td>Updated</td>
            <td>{user.updatedAt}</td>
          </tr>
          <tr>
            <td>SyncAt</td>
            <td>{user.ldapSyncAt || ""}</td>
          </tr>
          <tr>
            <td>Platform Access Role</td>
            <td>{accessRoleLabel}</td>
          </tr>
          <tr>
            <td>Groups Membership</td>
            <td>
              {user.groups !== undefined && user.groups.map((group) => {
                return <div className="pb-1" key={group}>{group}</div>;
              })}
            </td>
          </tr>
          {user.ldap && getLdapUserInfo()}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="100%" className="px-2 pt-2 table-footer"/>
          </tr>
          </tfoot>
        </Table>
      </div>
    );
  };

  const getSyncButton = () => {
    return (
      <div className="text-right pb-3">
        <Button variant="primary" size="sm" disabled={isSyncing} onClick={() => syncUserData()}>
          {isSyncing ?
            <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Syncing</> :
            <><FontAwesomeIcon icon={faSync} fixedWidth className="mr-2"/>Re-Sync Profile</>}
        </Button>
      </div>
    );
  };

  return (
    <ScreenContainer
      isLoading={isLoading}
      breadcrumbDestination={"userProfile"}
      pageDescription={`
          Review and manage your user profile information as well as platform settings from this page. Please note,
          profile details are
          stored in your identify provider so some changes may not be possible from this portal at this time.
      `}>
      {getSyncButton()}
      {getUserInfo()}
    </ScreenContainer>
  );
}

export default Profile;
