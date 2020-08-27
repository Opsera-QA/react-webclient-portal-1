import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import ErrorDialog from "../../common/status_notifications/error";
import LoadingDialog from "../../common/status_notifications/loading";
import "../accounts.css";
import LdapOrganizationsTable from "./LdapOrganizationsTable";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewLdapOrganizationModal from "./NewLdapOrganizationModal";
import accountsActions from "../accounts-actions";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await getRoles();
    setLoading(false);
  };

  const loadOrganizations = async () => {
    try {
      const response = await accountsActions.getOrganizations(getAccessToken);
      setLdapOrganizationData(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
  };

  const createOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      if (userRoleAccess.OpseraAdministrator) {
        await loadOrganizations();
      }
    }
  };

  if (!accessRoleData || loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationManagement" />

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
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message} /></div>}
        {ldapOrganizationData && <LdapOrganizationsTable data={ldapOrganizationData} />}
        <NewLdapOrganizationModal showModal={showCreateOrganizationModal} loadData={loadData} setShowModal={setShowCreateOrganizationModal}/>
      </div>
  </>);
  }
}

export default LdapOrganizationManagement;

