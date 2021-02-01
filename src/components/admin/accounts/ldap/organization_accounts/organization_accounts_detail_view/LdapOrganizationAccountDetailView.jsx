import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import departmentActions from "components/admin/accounts/ldap/ldap_departments/department-functions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationAccountDetailPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailPanel";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [organizationName, setOrganizationName] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedIdpActions, setAuthorizedIdpActions] = useState([]);
  const [authorizedDepartmentActions, setAuthorizedDepartmentActions] = useState([]);


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

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      let authorizedIdpActions = await accountsActions.getAllowedIdpAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedIdpActions(authorizedIdpActions);
      let authorizedDepartmentActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedDepartmentActions(authorizedDepartmentActions);

      if (authorizedActions?.includes("get_organization_account_details")) {
        await loadOrganizationAccount();
      }

      if (authorizedDepartmentActions?.includes("get_department_details")) {
        await loadDepartments();
      }
    }
  };

  const loadOrganizationAccount = async () => {
      const response = await accountsActions.getOrganizationAccountByDomain(organizationDomain, getAccessToken);

      if (response?.data != null) {
        setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
        setOrganizationName(response.data.org?.name);
      }
  };

  const loadDepartments = async () => {
    const response = await departmentActions.getDepartmentsByDomain(organizationDomain, getAccessToken);

    if (response?.data != null) {
      setLdapDepartmentData(response.data);
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
      accessDenied={!authorizedActions?.includes("get_organization_account_details")}
      metadata={ldapOrganizationAccountMetaData}
      dataObject={ldapOrganizationAccountData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationAccountDetailPanel
          authorizedActions={authorizedActions}
          authorizedIdpActions={authorizedIdpActions}
          authorizedDepartmentActions={authorizedDepartmentActions}
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          setLdapOrganizationAccountData={setLdapOrganizationAccountData}
          loadData={loadData}
          ldapDepartmentData={ldapDepartmentData}
          organizationDomain={organizationDomain}
        />
      }
    />
  );
}

export default LdapOrganizationAccountDetailView;