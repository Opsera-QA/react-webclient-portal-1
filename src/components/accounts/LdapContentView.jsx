// This is the summary view of a topic: organization, accounts, users etc.  This should primarily be a table view of the content (filtered by what user could see in theory)
//  Selecting an item form this list should then tak user to the LdapDetailView where we show the split design of "info" in the top half and forms/details in the bottom

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { format } from "date-fns"; //used for displaying date/times cleanly
import LdapContentTable from "./contentTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./accounts.css";

/*Russ:  The LdapContentTable compontent is a re-usable componetnt Noah wrote that leverages a react library (custom table).  Just 
  makes working with tables easier.  So it's a good thing to look into as well.  Basically this code on load (when useEffect is triggered) 
  will set the state view variable, check if the user is an admin and then call the function to get the API data and load it into the "ldapData"
  state variable for access within the component
*/

function LdapContentView() {
  const { view } = useParams();
  const [administrator, setAdministrator] = useState(false);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const [contentView, setContentView] = useState("");
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ldapData, setLdapData] = useState([]); //default is array to store API data used in display, this is a state variable so will follow react state lifecycle

  useEffect(() => { //definitely read up on this Hook.  It's a critical one and something you want to understand the lifecycle of very well
    isAdmin();

    if(view) { //captures the view value passed into the URL to determine what compotnent below to show
      setContentView(view);      
    }

    //on component render (or reload) trigger API call to get data
    loadLdapData(view);
  }, []);


  const loadLdapData = async (view) => {
    //api call here changes based on view
    setLoading(true);
    let apiUrl = "";

    switch (view) {
    case "organizations":
      apiUrl = "/users/account/organizations";
      break;
    case "accounts":
      apiUrl = "/users/account/organizations";
      break;
    case "groups":
      apiUrl = "";
      break;
    case "users":
      apiUrl = "";
      break;
    default:
      apiUrl = "";
    }

    try {
      const accessToken = await getAccessToken(); //this calls the persistent AuthContext state to get latest token (for passing to Node)
      const data = await axiosApiService(accessToken).get(apiUrl, {});
      console.log(data);
      setLdapData(data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
    
  };

  const isAdmin = async () => {    
    const userInfo = await getUserRecord();
    setAdministrator(userInfo.groups.includes("Admin"));        
  };

  const setViewDisplayName = (view) => {
    switch (view) {
    case "organizations":
      return "Organizations";
    case "accounts":
      return "Organization Accounts";
    case "groups":
      return "Groups";
    case "users":
      return "Users";
    default:
      return view;
    }
  };

  if (loading) {
    return (<LoadingDialog />);
  } else if (!administrator) {
    return (<ErrorDialog align="center" error="Access Denied!  Your account does not have privileges to access this tool."></ErrorDialog>);
  } else {
    return (
      <>
        <div className="max-content-width ml-2 mt-1">
          <h5>User and Account Management</h5>
          <div className="mb-1">Manger organizations, accounts, groups and users from this dashboard.</div>
  

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
              <li className="breadcrumb-item">
                <Link to="/accounts">Account Management</Link>
              </li>
              <li className="breadcrumb-item active upper-case-first">{setViewDisplayName(contentView)}</li> 
            </ol>
          </nav> 

          {error && <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}

          {!error && !loading && 
          <div className="mt-1">
            <h6>View Name</h6>
            <div>Details on what the user is seeing here.</div>
             <LdapContentTable data={ldapData["data"]} />
            
          </div> }

        </div>
      </>
    );
  }

  
}

export default LdapContentView;

