// This is the summary view of a topic: organization, accounts, users etc.  This should primarily be a table view of the content (filtered by what user could see in theory)
//  Selecting an item form this list should then tak user to the LdapDetailView where we show the split design of "info" in the top half and forms/details in the bottom

import React, { useMemo, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import CustomTable from "../common/table";
import { Link } from "react-router-dom";
import { format } from "date-fns"; //used for displaying date/times cleanly


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./accounts.css";

/*Russ:  The LdapContentTable compontent is a re-usable componetnt Noah wrote that leverages a react library (custom table).  Just 
  makes working with tables easier.  So it's a good thing to look into as well.  Basically this code on load (when useEffect is triggered) 
  will set the state view variable, check if the user is an admin and then call the function to get the API data and load it into the "ldapData"
  state variable for access within the component
*/

function OrganizationsView() {
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ldapData, setLdapData] = useState([]); //default is array to store API data used in display, this is a state variable so will follow react state lifecycle

  useEffect(() => { //definitely read up on this Hook.  It's a critical one and something you want to understand the lifecycle of very well
    isAdmin();

    //on component render (or reload) trigger API call to get data
    loadData(); //you should NOT use "await" in useEffect, so even though the function supports it, it's not recomended or needed
  }, []);


  const loadData = async () => {
    setLoading(true);
    let apiUrl = "/users/account/organizations";

    try {
      const accessToken = await getAccessToken(); //this calls the persistent AuthContext state to get latest token (for passing to Node)
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      console.log(response.data);
      setLdapData(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
    
  };

  const isAdmin = async () => {    
    const userInfo = await getUserRecord();
    setUserGroups(userInfo.groups);
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
            <li className="breadcrumb-item active">Organizations</li> 
          </ol>
        </nav> 
        
        <div className="max-content-width ml-2">
          <h5>Organization and Account Management</h5>

          {error && <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}

          {!error && !loading && 
          <div className="mt-4">
            <h6>Organizations</h6>
            
            {/* // NEED to do this ldapData check first because when the react component is initializing, there are some times where it's null and the chart blows up.   */}
            {ldapData && <ContentTable data={ldapData} view="organizations" />}
            
          </div> }

        </div>
      </>
    );
  }  
}


//breaking this out into a separate component just for logical reading.  
// normally I would have created this as a separate file, but in buildinng this I found the 
// content table setup is very specific to Organiation values, so didn't make sense to abstract
//  Originally I was trying to abstract all these views, but it's not worth it.
function ContentTable({ data, view }) {
  const history = useHistory();
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  const rowStyling = (row) => {
    return "";
    // return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Organization Name",
        accessor: "orgName"
      },
      {
        Header: "Owner Email",
        accessor: "orgOwnerEmail"
      }
    ],
    []
  );

  const onRowSelect = (selectedRow) => {
    //first output the entire selected row value to see what you have
    console.log(selectedRow);
    let itemId = selectedRow && selectedRow.values && selectedRow.values.name; //I'm not sure what a "ID" is for an entry in LDAP, so I'm choosing NAME for now, but please review that and set this to the unique ID value for the selected entry.
    
    console.log(selectedRow.values);
    history.push("/accounts/"+view+"/detail/"+itemId);
  };


  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        onRowSelect={onRowSelect}
        rowStyling={rowStyling}
        initialState={initialState}
        // tableFilter={tableFilter}
      >
      </CustomTable>
    </>
  );
}

/*defining "propTypes" is a best practice and isn't required.  In the code here, 
  only the ContentTable component actually has props passed into it, so that's why only this 
  one is defined below.  First instinct in building these types of componetnts is to do one API 
  call at the top and then pass the data between everything.  I'm choosing not to do that for 2 reasons.
  1) I'm updating the URL when changing views so that users can share links to specific views.  Doing so, 
  it's just better to ensure each top view: Organizations, Org Detail/Accounts, Users, etc has it's own API calls 
  and is rather stand alone.
  2) It gets complicated to manage state/data AND if two users are working on the same data in two different views, 
  you could be working with old data.
*/
ContentTable.propTypes = {
  view: PropTypes.string,
  data: PropTypes.array 
};

export default OrganizationsView;

