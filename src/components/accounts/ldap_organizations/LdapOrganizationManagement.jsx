// This is the summary view of a topic: organization, accounts, users etc.  This should primarily be a table view of the content (filtered by what user could see in theory)
//  Selecting an item form this list should then tak user to the LdapDetailView where we show the split design of "info" in the top half and forms/details in the bottom

import React, {useMemo, useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
import {Link} from "react-router-dom";

import "../accounts.css";
import LdapOrganizationsTable from "./LdapOrganizationsTable";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewLdapOrganizationModal from "./NewLdapOrganizationModal";
import accountsActions from "../accounts-actions";

function LdapOrganizationManagement() {
  const [administrator, setAdministrator] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {getUserRecord, getAccessToken} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);

  useEffect(() => {
    isAdmin();
    loadData();
  }, []);


  const loadData = async () => {
    setLoading(true);

    try {
      const response = await accountsActions.getOrganizations(getAccessToken);
      // console.log("Get Organizations: " + JSON.stringify(response.data));
      setLdapOrganizationData(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);

  };

  const createOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  const onModalClose = () => {
    setShowCreateOrganizationModal(false);
    loadData();
  };

  const isAdmin = async () => {
    const userInfo = await getUserRecord();
    setUserGroups(userInfo.groups);
    setAdministrator(userInfo.groups.includes("Admin"));
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
          <li className="breadcrumb-item active">Organizations</li>
        </ol>
      </nav>

      <div className="max-content-width ml-2">
        <div className="justify-content-between mb-1 d-flex">
          <h5>Organization and Account Management</h5>
          <div className="d-flex">
            <div className="mt-1">
              <Button variant="primary" size="sm"
                      onClick={() => {
                        createOrganization();
                      }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Organization
              </Button>
            </div>
            <br/>
          </div>
        </div>

        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}

        {!error && !loading &&
        <div className="mt-4">
          <h6>Organizations</h6>

          {/* // NEED to do this ldapOrganizationData check first because when the react component is initializing, there are some times where it's null and the chart blows up.   */}
          {ldapOrganizationData && <LdapOrganizationsTable data={ldapOrganizationData} view="organizations"/>}

        </div>}

        {showCreateOrganizationModal ? <NewLdapOrganizationModal
          showModal={showCreateOrganizationModal}
          onModalClose={onModalClose}/> : null}
      </div>
  </>);
  }
}

export default LdapOrganizationManagement;

