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
import departmentActions from "../../ldap_departments/department-functions";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
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

      if (authorizedActions.includes("get_organization_account_details")) {
        await loadOrganizationAccount();
      }

      if (authorizedDepartmentActions.includes("get_department_details")) {
        await loadDepartments();
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

  const loadDepartments = async () => {
    const response = await departmentActions.getDepartmentsByDomain(organizationDomain, getAccessToken);

    if (response != null && response.data != null) {
      setLdapDepartmentData(response.data);
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