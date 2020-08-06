import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../../../common/error";
import LoadingDialog from "../../../common/loading";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";

import "../../accounts.css";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../common/accessDeniedInfo";

function LdapOrganizationDetailView() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [organization, setOrganization] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);


  useEffect(() => {
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
    console.log("ID: " + id);
    setLoading(true);
    let apiUrl = `/users/account/organization/${id}`;

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post(apiUrl, {});
      // console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setOrganization(response.data);
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

        {organization &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h6>Organization Details [{organization && organization.name}]</h6></div>
          <div>
            <LdapOrganizationSummaryPanel organization={organization}/>
          </div>
          <div>
            <LdapOrganizationDetailPanel organizationAccounts={organizationAccounts} organization={organization}
                                         setOrganization={setOrganization} loadData={loadData}/>
          </div>
          <div className="content-block-footer"/>
        </div>

        }
      </>);
  }
}

export default LdapOrganizationDetailView;