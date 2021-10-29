import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import {ldapIdpAccountsMetaData} from "components/admin/accounts/ldap/idp_accounts/ldap-idp-account-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import {AuthContext} from "contexts/AuthContext";

function LdapOrganizationAccountIdpPanel({ ldapOrganizationAccountData, loadData, currentUser, isMounted }) {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [showIdpEditPanel, setShowIdpEditPanel] = useState(false);
  const [ldapIdpAccountData, setLdapIdpAccountData] = useState(undefined);
  const [authorizedIdpActions, setAuthorizedIdpActions] = useState([]);

  useEffect(() => {
    if (isMounted?.current === true) {
      initializeData();
    }
  }, []);

  const initializeData = async () => {
    const {ldap} = currentUser;
    const userRoleAccess = await setAccessRoles(currentUser);
    // let authorizedIdpActions = await accountsActions.getAllowedIdpAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
    // setAuthorizedIdpActions(authorizedIdpActions);
    // let authorizedDepartmentActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
    // setAuthorizedDepartmentActions(authorizedDepartmentActions);
    //
    // if (authorizedDepartmentActions?.includes("get_department_details")) {
    //   await loadDepartments();
    // }
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }


  const loadIdpAccount = () => {
    let idpAccounts = ldapOrganizationAccountData.getData("idpAccounts");
    if (idpAccounts != null && idpAccounts.length > 0) {
      setLdapIdpAccountData(new Model(idpAccounts[0], ldapIdpAccountsMetaData, false));
    }
    else {
      setLdapIdpAccountData(new Model({...ldapIdpAccountsMetaData.newObjectFields}, ldapIdpAccountsMetaData, true));
    }
  };


  return null;

  // if (showIdpEditPanel || ldapIdpAccountData.isNew()) {
  //   return (
  //     <LdapIdpAccountEditorPanel
  //       setLdapIdpAccountData={setLdapIdpAccountData}
  //       setShowIdpEditPanel={setShowIdpEditPanel}
  //       ldapOrganizationAccountData={ldapOrganizationAccountData}
  //       ldapIdpAccountData={ldapIdpAccountData}
  //       authorizedActions={authorizedIdpActions}
  //     />
  //   );
  // }
  //
  // return (
  //   <LdapIdpAccountSummaryPanel
  //     ldapIdpAccountData={ldapIdpAccountData}
  //     setShowIdpEditPanel={setShowIdpEditPanel}
  //     authorizedActions={authorizedIdpActions}
  //   />
  // );
}

LdapOrganizationAccountIdpPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUser: PropTypes.object,
  isMounted: PropTypes.object
};

export default LdapOrganizationAccountIdpPanel;
