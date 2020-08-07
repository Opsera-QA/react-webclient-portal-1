import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../contexts/AuthContext";
import {useParams} from "react-router-dom";
import ErrorDialog from "../../../common/error";
import LoadingDialog from "../../../common/loading";
import "../../accounts.css";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import LdapGroupDetailPanel from "./LdapGroupDetailPanel";
import accountsActions from "../../accounts-actions";
import AccessDeniedDialog from "../../../common/accessDeniedInfo";

function LdapGroupDetailView() {
  const {name, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    getRoles();
  }, []);

  const getGroup = async () => {
    let payload = {
      domain: orgDomain,
      groupName: name,
    };
    const response = await accountsActions.getGroup(payload, getAccessToken);
    setLdapGroupData(response.data);
  };

  const getOrganization = async (domain) => {
    if (domain != null) {
      const response = await accountsActions.getOrganizationByEmail({domain: domain}, getAccessToken);
      let ldapOrganizationData = response.data;
      setLdapOrganizationData(ldapOrganizationData);
    }
  };

  const getRoles = async () => {
    setPageLoading(true);
    const user = await getUserRecord();
    setCurrentUserEmail(user.email);
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess["Administrator"] === true)
      await getOrganization(orgDomain);
      await getGroup();
    }
    setPageLoading(false);
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (accessRoleData.Administrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
        {ldapOrganizationData && ldapGroupData &&
        <div className="max-content-width">
          <BreadcrumbTrail destination="ldapGroupDetailView"/>
          <div className="content-container content-card-1 ml-2">
            <div className="pt-2 pl-2 content-block-header">
              <h6>Group Details [{ldapGroupData && ldapGroupData.name}]</h6>
            </div>
            <div>
              <LdapGroupSummaryPanel ldapGroupData={ldapGroupData} domain={orgDomain}/>
            </div>
            <div>
              <LdapGroupDetailPanel orgDomain={orgDomain} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData}
                                    currentUserEmail={currentUserEmail} setLdapGroupData={setLdapGroupData} loadData={getRoles}/>
            </div>
            <div className="content-block-footer"/>
          </div>
        </div>
        }
      </>);
  }
}

export default LdapGroupDetailView;