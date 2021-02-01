import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationDetailPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailPanel";

function LdapOrganizationDetailView() {
  const { organizationName } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedOrganizationAccountActions, setAuthorizedOrganizationAccountActions] = useState([]);


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
    let {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      setAccessRoleData(userRoleAccess);

      let authorizedOrganizationAccountActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedOrganizationAccountActions(authorizedOrganizationAccountActions);

      if (authorizedActions.includes("get_organization_details")) {
        await loadOrganization();
      }
    }
  };

  const loadOrganization = async () => {
    const response = await accountsActions.getOrganizationByName(organizationName, getAccessToken);

    if (response?.data != null) {
      setLdapOrganizationData(new Model(response.data, ldapOrganizationMetaData, false));
      setOrganizationAccounts(response.data["orgAccounts"]);
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
      breadcrumbDestination={"ldapOrganizationDetailView"}
      metadata={ldapOrganizationMetaData}
      accessDenied={!authorizedActions.includes("get_organization_details")}
      dataObject={ldapOrganizationData}
      isLoading={!accessRoleData || isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationDetailPanel
          organizationAccounts={organizationAccounts}
          ldapOrganizationData={ldapOrganizationData}
          setLdapOrganizationData={setLdapOrganizationData}
          authorizedOrganizationAccountActions={authorizedOrganizationAccountActions}
          loadData={loadData}
          authorizedActions={authorizedActions}
      />}
    />
  );
}

export default LdapOrganizationDetailView;