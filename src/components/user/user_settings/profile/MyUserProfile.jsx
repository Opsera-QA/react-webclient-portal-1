import React, {useContext, useEffect, useRef, useState} from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapSettingsPanel
  from "components/admin/registered_users/details/ldap_settings/LdapSettingsPanel";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import RegisteredUserSummary from "components/admin/registered_users/details/RegisteredUserSummary";
import AccessRoleField from "components/common/fields/access/AccessRoleField";
import axios from "axios";

function MyUserProfile() {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [user, setUser] = useState(undefined);
  const [userModel, setUserModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accessRole, setAccessRole] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadUserRecord();
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadUserRecord = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRole(userRoleAccess);
      setUser(user);
      setUserModel(new Model({...user}, registeredUsersMetadata, false));
    }
  };

  const syncUserData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsSyncing(true);
      await userActions.syncUser(getAccessToken, cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsSyncing(false);
      }
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
    );
  };

  const getLdapUserInfo = () => {
    if (user?.ldap) {
      return (
        <tr>
          <td>Organization & Account</td>
          <td>
            <LdapSettingsPanel userData={userModel} ldapData={user?.ldap} />
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
