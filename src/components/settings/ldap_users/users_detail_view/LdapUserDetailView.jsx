import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapUserDetailPanel from "components/settings/ldap_users/users_detail_view/LdapUserDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";

function LdapUserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
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
  };

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);

    if (response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
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
            {accessRoleData?.OpseraAdministrator && <ActionBarBackButton path={"/settings/users"} />}
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={(accessRoleData?.PowerUser || accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator) ? "ldapUserDetailView" : "ldapUserDetailViewLimited"}
      metadata={ldapUserMetadata}
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