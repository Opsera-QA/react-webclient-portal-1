import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../../admin/accounts/accounts-actions";
import LoadingDialog from "../../../common/status_notifications/loading";
import Model from "../../../../core/data_model/model";
import {ldapUsersMetaData} from "../ldap-users-metadata";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";

function LdapUserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

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

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);

    if (response != null && response.data != null) {
      setLdapUserData(new Model(response.data, ldapUsersMetaData, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (userRoleAccess.OpseraAdministrator || ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, userEmail, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);

        if (authorizedActions.includes("get_user_details")) {
          await getLdapUser(userEmail);
        }
      }
    }
  };

  const getActionBar = () => {
    if (ldapUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/users"} />
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  if (!authorizedActions.includes("get_user_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) ? "ldapUserDetailView" : "ldapUserDetailViewLimited"}
      metadata={ldapUsersMetaData}
      accessDenied={!authorizedActions?.includes("get_user_details")}
      dataObject={ldapUserData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapUserDetailPanel
          setLdapUserData={setLdapUserData}
          orgDomain={orgDomain}
          ldapUserData={ldapUserData}
          authorizedActions={authorizedActions}
        />
      }
    />
  );
}

export default LdapUserDetailView;