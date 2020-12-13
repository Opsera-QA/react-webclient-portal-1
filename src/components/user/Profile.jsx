import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Table } from "react-bootstrap";
import LoadingDialog from "../common/status_notifications/loading";
import { DialogToastContext } from "../../contexts/DialogToastContext";
import userActions from "./user-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-solid-svg-icons/faUser";
import { faSync, faSpinner } from "@fortawesome/pro-light-svg-icons";

function Profile() {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [data, setData] = useState({});
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

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
    /*const response = await userActions.getAnalyticsSettings(getAccessToken);
    setData(response.data.profile[0]);*/
    setUser(await getUserRecord());
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

  const getUserInfo = () => {
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
            <td>Groups & Roles</td>
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

  return (
    <div className="mt-3 max-content-width">
      <div className="max-content-width mt-3 mb-4">
        <h4>My User Profile</h4>
        <p>Review and manage your user profile information as well as platform settings from this page. Please note,
          profile details are
          stored in your identify provider so some changes may not be possible from this portal at this time.</p>
      </div>
      <div className="content-container content-card-1 max-content-width ml-2 mb-2">
        <div className="pl-2 content-block-header title-text-header-1">
          <FontAwesomeIcon icon={faUser} fixedWidth className="mr-1"/>My Profile
        </div>
        <div className="text-right p-1">
          <Button variant="primary" size="sm"
                  disabled={isSyncing}
                  onClick={() => syncUserData()}>
            {isSyncing ?
              <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Syncing</> :
              <><FontAwesomeIcon icon={faSync} fixedWidth className="mr-2"/>Re-Sync Profile</>}
          </Button></div>

        {isLoading && <LoadingDialog size={"sm"} message={"Loading User Details"}/>}
        {user && getUserInfo()}
      </div>
    </div>
  );
}

export default Profile;
