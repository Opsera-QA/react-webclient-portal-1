import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapSettingsPanel
  from "components/admin/registered_users/registered_user_details/ldap_settings/LdapSettingsPanel";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registered-users-metadata";
import RegisteredUserSummary from "components/admin/registered_users/registered_user_details/RegisteredUserSummary";
import AccessRoleField from "components/common/fields/access/AccessRoleField";

function MyUserProfile() {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [user, setUser] = useState(undefined);
  const [userModel, setUserModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accessRole, setAccessRole] = useState(undefined);

  useEffect(() => {
    loadData()
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
    setUserModel(new Model({...user}, registeredUsersMetadata, false));

    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRole(userRoleAccess);
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

  const getOpseraUserInfo = () => {
    return (
      <tr>
        <td>Opsera User Information</td>
        <td>
          <RegisteredUserSummary userData={userModel} userAccess={accessRole} />
        </td>
      </tr>
    )
  };

  const getLdapUserInfo = () => {
    if (user?.ldap) {
      return (
        <tr>
          <td>Organization & Account</td>
          <td>
            <LdapSettingsPanel userData={userModel} />
          </td>
        </tr>
      );
    }
  };

  // TODO: Style better
  const getUserInfo = () => {
    if (user == null) {
      return <></>;
    }

    return (
      <div className="pt-2">
        <Table className="m-0">
          <tbody>
          {getOpseraUserInfo()}
          {getLdapUserInfo()}
          </tbody>
        </Table>
      </div>
    );
  };

  const getSyncButton = () => {
    return (
      <div className="justify-content-between d-flex px-3">
        <div className="mt-1">
          <AccessRoleField accessRole={accessRole} />
        </div>
        <Button variant="primary" size="sm" disabled={isSyncing} onClick={() => syncUserData()}>
          {isSyncing ?
            <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Syncing</> :
            <><FontAwesomeIcon icon={faSync} fixedWidth className="mr-2"/>Re-Sync Profile</>}
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message="Loading User Profile" />);
  }

  return (
    <div>
      {getSyncButton()}
      {getUserInfo()}
    </div>
  );
}

export default MyUserProfile;
