import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faSpinner } from "@fortawesome/pro-light-svg-icons";
import { defineUserRole } from "utils/helpers";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapSettingsPanel
  from "components/admin/registered_users/registered_user_details/ldap_settings/LdapSettingsPanel";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registered-users-metadata";
import RegisteredUserSummary from "components/admin/registered_users/registered_user_details/RegisteredUserSummary";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";

function MyUserProfile() {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [user, setUser] = useState(undefined);
  const [userModel, setUserModel] = useState(undefined);
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
    setUserModel(new Model({...user}, registeredUsersMetadata, false));

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

  const getOpseraUserInfo = () => {
    return (
      <tr>
        <td>Opsera User Information</td>
        <td>
          <RegisteredUserSummary userData={userModel} />
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
      <DetailPanelContainer>
        <Table className="custom-table mb-0">
          <tbody>
          {getOpseraUserInfo()}
          <tr>
            <td>Platform Access Role</td>
            <td>{accessRoleLabel}</td>
          </tr>
          {getLdapUserInfo()}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="100%" className="px-2 pt-2 table-footer"/>
          </tr>
          </tfoot>
        </Table>
      </DetailPanelContainer>
    );
  };

  const getSyncButton = () => {
    return (
      <div className="text-right">
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
