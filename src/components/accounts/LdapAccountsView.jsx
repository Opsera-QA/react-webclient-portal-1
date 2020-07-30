import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { format } from "date-fns"; 
import LdapOrganizationDetails from "./ldapOrganizationDetails";
import LdapOrganizationAccounts from "./ldapOrganizationAccounts";
import LdapOrganizationAccountDetails from "./ldapOrganizationAccountDetails";

import "./accounts.css";

function LdapAccountsView() {
  const { id } = useParams();
  console.log("[LdapAccountsView] id:", id);
  
  const { getUserRecord, getAccessToken } = useContext(AuthContext); 
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  const [organization, setOrganization] = useState(null);
  const [activeTab, setActiveTab] = useState("accounts");
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleTabClick = (event) => {
    event.preventDefault();
    if (currentAccount) { // Only changes tabs if their is a selected account
      setActiveTab((activeTab === "accounts") ? "account-details" : "accounts");
    }
    
  };

  const handleAccountClick = (itemId) => {
    console.log("[LdapAccountsView] handleAccountClick", itemId);
    organization.orgAccounts.forEach((orgAccount) => {
      if (orgAccount.name === itemId) {
        setCurrentAccount(orgAccount);
        setActiveTab("account-details");
      }
    });
  };
  
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
    //need to wire this up still
    setLoading(true);
    let apiUrl = `/users/account/organization/${id}`;

    try {
      const accessToken = await getAccessToken(); //this calls the persistent AuthContext state to get latest token (for passing to Node)
      const response = await axiosApiService(accessToken).post(apiUrl, {});
      //console.log("[LdapAccountsView] Response: ", response.data);
      setOrganization(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
    
  };
  
  if (loading) {
    return (<LoadingDialog />);
  } else if (!administrator && !loading && userGroups.length > 0) {
    return (<ErrorDialog align="center" error="Access Denied!  Your account does not have privileges to access this tool."></ErrorDialog>);
  } else {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/accounts">Account Management</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/accounts/organizations">Organizations</Link>
            </li>
            <li className="breadcrumb-item active">Accounts</li> 
          </ol>
        </nav> 
        
        <div className="max-content-width ml-2">
          <h5>Organization and Account Management</h5>

          {error && <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
         
         
          <div className="list-item-container">
            <LdapOrganizationDetails organization={ organization } />
            <ul className="nav nav-tabs w-100">
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "accounts" ? "active" : "")} href="#" onClick={handleTabClick}>Accounts</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "account-details" ? "active" : "")} href="#" onClick={handleTabClick}>Account Details</a>
              </li>
            </ul>

            <div className="list-item-container">
              {
                ( organization ) ?
                  activeTab === "accounts" ?
                    <LdapOrganizationAccounts accounts={ organization.orgAccounts } onClick={handleAccountClick} /> :
                    <LdapOrganizationAccountDetails account={ currentAccount } />
                  : null
              }
            </div>
          </div>
        </div>
      </> );
  }
}

export default LdapAccountsView; 