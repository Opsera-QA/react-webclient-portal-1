import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../contexts/AuthContext";
import {useParams} from "react-router-dom";
import {axiosApiService} from "api/apiService";
import ErrorDialog from "../../../common/error";
import LoadingDialog from "../../../common/loading";
import {Link} from "react-router-dom";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";

import "../../accounts.css";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";

function LdapOrganizationDetailView() {
  const {id} = useParams();
  const {getUserRecord, getAccessToken} = useContext(AuthContext);
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [organization, setOrganization] = useState(null);


  useEffect(() => {
    isAdmin();

    //on component render (or reload) trigger API call to get data
    loadData();
  }, []);

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    setUserGroups(userInfo.groups);
    setAdministrator(userInfo.groups.includes("Admin"));
  };

  const loadData = async () => {
    console.log("ID: " + id);
    setLoading(true);
    let apiUrl = `/users/account/organization/${id}`;

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post(apiUrl, {});
      console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setOrganization(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);

  };

  if (loading) {
    return (<LoadingDialog/>);
  } else if (!administrator && !loading && userGroups.length > 0) {
    return (<ErrorDialog align="center"
                         error="Access Denied!  Your account does not have privileges to access this tool."></ErrorDialog>);
  } else {
    return (
      <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor: "#fafafb"}}>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/accounts/organizations">Organizations</Link>
          </li>
          <li className="breadcrumb-item active">Accounts</li>
        </ol>
      </nav>

      <h5>Organization and Account Management</h5>

      {error &&
      <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}

      {organization &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header">
          <h5>Organization Details [{organization && organization.name}]</h5></div>
        <div>
          <LdapOrganizationSummaryPanel organization={organization} />
        </div>
        <div>
          <LdapOrganizationDetailPanel organization={organization} setOrganization={setOrganization} loadData={loadData} />
        </div>
        <div className="content-block-footer" />
      </div>

      }
  </> );
  }
  }

  export default LdapOrganizationDetailView;