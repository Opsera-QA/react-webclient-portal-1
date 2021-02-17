import React, {useContext, useState, useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationAccountDetailPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailPanel";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function LdapOrganizationAccountDetailView() {
  const history = useHistory();
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const [organizationName, setOrganizationName] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
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
    }
  }, [organizationDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  }

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setCurrentUser(user);
      setAccessRoleData(userRoleAccess);

      if (organizationName == null || (!userRoleAccess?.OpseraAdministrator && ldap?.domain !== organizationDomain)) {
        history.push(`/admin/organization-accounts/${organizationDomain}/details/`);
      }

      let authorizedActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (authorizedActions?.includes("get_organization_account_details")) {
        await loadOrganizationAccount(cancelSource);
      }
    }
  };

  const loadOrganizationAccount = async (cancelSource = cancelTokenSource) => {
      const response = await accountsActions.getOrganizationAccountByDomainV2(getAccessToken, cancelSource, organizationDomain);

      if (response?.data != null) {
        setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
        setOrganizationName(response.data.org?.name);
      }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/organizations"} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      metadata={ldapOrganizationAccountMetaData}
      dataObject={ldapOrganizationAccountData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationAccountDetailPanel
          authorizedActions={authorizedActions}
          isMounted={isMounted}
          cancelTokenSource={cancelTokenSource}
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          setLdapOrganizationAccountData={setLdapOrganizationAccountData}
          loadData={loadData}
          currentUser={currentUser}
          organizationDomain={organizationDomain}
        />
      }
    />
  );
}

export default LdapOrganizationAccountDetailView;