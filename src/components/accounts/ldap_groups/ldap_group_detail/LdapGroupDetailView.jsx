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

function LdapGroupDetailView() {
  const {name, domain} = useParams();
  const {getUserRecord, getAccessToken} = useContext(AuthContext);
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [ldapGroupData, setLdapGroupData] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await isAdmin();
  };

  const getGroup = async () => {
    let payload = {
      domain: domain,
      groupName: name,
    };
    const response = await accountsActions.getGroup(payload, getAccessToken);
    setLdapGroupData(response.data);
  };

  const get = async (domain) => {
    if (domain != null) {
      const response = await accountsActions.getOrganizationByEmail({domain: domain}, getAccessToken);
      let ldapOrganizationData = response.data;
      setLdapOrganizationData(ldapOrganizationData);
    }
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    const {ldap, groups} = userInfo;
    if (ldap && ldap.domain === "opsera.io" && groups.includes("Admin")) { //checking for OpsERA account domain
      setAdministrator(true);
      await get(domain);
      await getGroup();
    } else {
      setAdministrator(false);
    }
    setAdministrator(false);
  };

  if (loading) {
    return (<LoadingDialog/>);
  } else if (!administrator && !loading && userGroups.length > 0) {
    return (<ErrorDialog align="center"
                         error="Access Denied!  Your account does not have privileges to access this tool."></ErrorDialog>);
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
              <LdapGroupSummaryPanel ldapGroupData={ldapGroupData} domain={domain}/>
            </div>
            <div>
              <LdapGroupDetailPanel ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData}
                                    setLdapGroupData={setLdapGroupData} loadData={loadData}/>
            </div>
            <div className="content-block-footer"/>
          </div>
        </div>
        }
      </>);
  }
}

export default LdapGroupDetailView;