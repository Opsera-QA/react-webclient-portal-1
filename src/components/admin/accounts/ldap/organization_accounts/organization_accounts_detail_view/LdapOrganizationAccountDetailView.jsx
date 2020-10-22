import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import "../../../accounts.css";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import {ldapOrganizationAccountMetaData} from "../ldap-organization-account-form-fields";
import LdapOrganizationAccountDetailPanel from "./LdapOrganizationAccountDetailPanel";
import {faSitemap, faUsers} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../../../common/panels/detail_view_container/DetailViewContainer";
import DataNotFoundContainer from "../../../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../../../common/status_notifications/data_not_found/DataNotFoundDialog";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const [organizationName, setOrganizationName] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedIdpActions, setAuthorizedIdpActions] = useState([]);


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

      if (authorizedActions.includes("get_organization_account_details")) {
        await loadOrganizationAccount();
      }
    }
  };

  const loadOrganizationAccount = async () => {
      const response = await accountsActions.getOrganizationAccountByDomain(organizationDomain, getAccessToken);

      if (response != null && response.data != null) {
        setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
        setOrganizationName(response.data["org"]["name"]);
      }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_account_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  if (!isLoading && ldapOrganizationAccountData == null) {
    return (
      <DataNotFoundContainer type={"Organization Account"} breadcrumbDestination={"ldapOrganizationAccountDetailView"}>
        <DataNotFoundDialog type={"Organization Account"} managementViewIcon={faSitemap} managementViewTitle={"Organization Management"} managementViewLink={"/admin/organizations"} />
      </DataNotFoundContainer>
    )
  }

    return (
      <DetailViewContainer
        breadcrumbDestination={"ldapOrganizationAccountDetailView"}
        title={ldapOrganizationAccountData != null ? `Organization Account Details [${ldapOrganizationAccountData["name"]}]` : undefined}
        titleIcon={faUsers}
        isLoading={isLoading}
        summaryPanel={<LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} organizationName={organizationName}/>}
        detailPanel={<LdapOrganizationAccountDetailPanel authorizedActions={authorizedActions} authorizedIdpActions={authorizedIdpActions} ldapOrganizationAccountData={ldapOrganizationAccountData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} loadData={loadData}/>}
      />
    );
}

export default LdapOrganizationAccountDetailView;