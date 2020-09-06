import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ErrorDialog from "../../../../../common/status_notifications/error";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import "../../../accounts.css";
import BreadcrumbTrail from "../../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import {ldapOrganizationAccountMetaData} from "../ldap-organization-account-form-fields";
import LdapOrganizationAccountDetailPanel from "./LdapOrganizationAccountDetailPanel";
import {getOrganizationList} from "../../organizations/organization-functions";
import {getLoadingErrorDialog} from "../../../../../common/toasts/toasts";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const [organizationName, setOrganizationName] = useState(undefined);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    setLoading(true);
    getRoles();
    loadData();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const loadData = async () => {
    try {
      const response = await accountsActions.getOrganizationAccountByDomain(organizationDomain, getAccessToken);
      setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
      setOrganizationName(response.data["org"]["name"])
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
    setLoading(false);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }
    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationAccountDetailView"/>
        <h5>Organization Account Management</h5>
        {showToast && toast}

        {ldapOrganizationAccountData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h6>Organization Account Details [{ldapOrganizationAccountData && ldapOrganizationAccountData["name"]}]</h6>
          </div>
          <div className="detail-view-body">
            <div>
              <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} organizationName={organizationName}/>
            </div>
            <div>
              <LdapOrganizationAccountDetailPanel ldapOrganizationAccountData={ldapOrganizationAccountData} setLdapOrganizationAccountData={setLdapOrganizationAccountData} loadData={loadData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>

        }
      </>);
}

export default LdapOrganizationAccountDetailView;