import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { format } from "date-fns"; 


import "./accounts.css";

function LdapAccountsView() {
  const { id } = useParams();
  const [contentView, setContentView] = useState("");
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used
  
  useEffect(() => { //definitely read up on this Hook.  It's a critical one and something you want to understand the lifecycle of very well
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
    /* setLoading(true);
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
    setLoading(false); */
    
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
         
         
          <div>
            TODO: This block should be where we show all the details we have on the selected Organization.  It probably should be its 
            own component that has the data passed into it.  As I commented in the code in LdapOrganizationsView.jsx, this page should get the ID 
            passed in through the URL, which I made the Organization.name for now and then do an API call lookup to get the details on just that org.
            The reason we want to do that is noted in LdapContentVIEW.JSX at the bottom.  So this particular file (LdapDetailView)
          </div>
          <div className="mt-4 mb-5">Passed Organization ID: {id}</div>
          <div className="mt-4 mb-5">UI Notes: Please use Bootstrap 4 based UI for display.  Specifically Flex box (https://getbootstrap.com/docs/4.0/utilities/flex/), 
          Spacing (https://getbootstrap.com/docs/4.0/utilities/spacing/) and specifically use the Bootstrap React libraries (https://react-bootstrap.github.io/components/alerts/) 
          as needed.  I typically rely on the 
          basic CSS classes from the native Bootstrap library unless more advanced functionality is required.</div>



          <div className="mt-5">This page should be split up into a top and bottom view (following the screenshot posted in the Jira ticket).  The 
          top as noted will be a grid based layout of the details of the ORganization that's selected.  Down here should be a detail view with two tabs:
          Accounts (which will show a table view of all accounts just like LdapOrganizationsView.jsx did) and a second "Accoutn Detail" tab.  When the 
          user clicks on an account in the table, it should switch to that tab showing the details of that account.  All of these are child compontents 
          of this LdapAccountsView, so they can share the data object.  They don't have to make new API calls, BUT these will be where we add edit forms as well 
          so please try to stub out create and edit forms in this "Account Detail" tab as well as an Edit Form for the top window to edit the Organization details.</div>

          <div className="mt-2">This design of Listing Organiations, and then selecting one to view accounts and then view/edit will need to be used for Group/User managment as well.  
          So keep that in mind when desining this as we will need to basically duplicate the overall structure and do this again for Groups and then Group Details/users.</div>

          <div className="mt-2">This is just a basic high level idea/design.  Please feel free to exapnd on this concept as you feel is best.</div>



        </div>
      </> );
  }

  
}

export default LdapAccountsView; 