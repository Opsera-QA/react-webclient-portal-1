import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import "../../../accounts.css";
import BreadcrumbTrail from "../../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import {ldapOrganizationAccountMetaData} from "../ldap-organization-account-form-fields";
import LdapOrganizationAccountDetailPanel from "./LdapOrganizationAccountDetailPanel";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";

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
      console.log("Authorized Actions: " + JSON.stringify(authorizedActions));
      setAuthorizedActions(authorizedActions);
      let authorizedIdpActions = await accountsActions.getAllowedIdpAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      console.log("Authorized IDP Actions: " + JSON.stringify(authorizedIdpActions));
      setAuthorizedIdpActions(authorizedIdpActions);

      if (authorizedActions.includes("get_organization_account_details")) {
        await loadOrganizationAccount();
      }
    }
  };

  const loadOrganizationAccount = async () => {
    try {
      const response = await accountsActions.getOrganizationAccountByDomain(organizationDomain, getAccessToken);
      setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
      setOrganizationName(response.data["org"]["name"])
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
    setIsLoading(false);
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_account_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationAccountDetailView"/>
        {ldapOrganizationAccountData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h6><FontAwesomeIcon icon={faUsers} fixedWidth className="mr-1" />Organization Account Details [{ldapOrganizationAccountData && ldapOrganizationAccountData["name"]}]</h6>
          </div>
          <div className="detail-view-body">
            <div>
              <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} organizationName={organizationName}/>
            </div>
            <div>
              <LdapOrganizationAccountDetailPanel authorizedActions={authorizedActions} authorizedIdpActions={authorizedIdpActions} ldapOrganizationAccountData={ldapOrganizationAccountData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} loadData={loadData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>

        }
      </>);
}

export default LdapOrganizationAccountDetailView;