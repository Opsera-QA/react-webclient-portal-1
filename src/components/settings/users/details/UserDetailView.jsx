import React, {useState, useEffect, useContext, useRef} from "react";
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
import axios from "axios";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";

function UserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };


  const getRoles = async (cancelSource = cancelTokenSource) => {
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
          await getLdapUser(cancelSource, userEmail);
        }
      }
    }
  };

  const getLdapUser = async (cancelSource = cancelTokenSource, userEmail) => {
    const response = await accountsActions.getUserByEmailV2(getAccessToken, cancelSource, userEmail);

    if (response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
    }
  };

  const getActionBar = () => {
    if (ldapUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/user-management/"} />
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
      navigationTabContainer={<UserManagementSubNavigationBar activeTab={"userViewer"} />}
      detailPanel={
        <LdapUserDetailPanel
          hideSettings={true}
          setLdapUserData={setLdapUserData}
          orgDomain={orgDomain}
          ldapUserData={ldapUserData}
          authorizedActions={authorizedActions}
        />
      }
    />
  );
}

export default UserDetailView;