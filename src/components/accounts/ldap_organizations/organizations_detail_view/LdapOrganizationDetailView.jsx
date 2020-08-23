import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ErrorDialog from "../../../common/status_notifications/error";
import LoadingDialog from "../../../common/status_notifications/loading";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";

import "../../accounts.css";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import {ldapOrganizationMetaData} from "../ldap-organizations-form-fields";
import accountsActions from "../../accounts-actions";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";

function LdapOrganizationDetailView() {
  const { organizationName } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);


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
    console.log("organizationName: " + organizationName);

    try {
      const response = await accountsActions.getOrganizationByName(organizationName, getAccessToken);
      // console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setLdapOrganizationData(new Model(response.data, ldapOrganizationMetaData, false));
      setOrganizationAccounts(response.data["orgAccounts"]);
      console.log("orgAccounts: " + JSON.stringify(response.data["orgAccounts"]));
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
  };

  if (!accessRoleData || loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationDetailView"/>

        <h5>Organization and Account Management</h5>

        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}

        {ldapOrganizationData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h6>Organization Details [{ldapOrganizationData && ldapOrganizationData["name"]}]</h6>
          </div>
          <div className="detail-view-body">
            <div>
              <LdapOrganizationSummaryPanel ldapOrganizationData={ldapOrganizationData}/>
            </div>
            <div>
              <LdapOrganizationDetailPanel organizationAccounts={organizationAccounts}
                                           ldapOrganizationData={ldapOrganizationData}
                                           setLdapOrganizationData={setLdapOrganizationData} loadData={loadData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>

        }
      </>);
  }
}

export default LdapOrganizationDetailView;