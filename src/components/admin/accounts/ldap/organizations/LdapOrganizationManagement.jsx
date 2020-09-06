import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ErrorDialog from "../../../../common/status_notifications/error";
import LoadingDialog from "../../../../common/status_notifications/loading";
import "../../accounts.css";
import LdapOrganizationsTable from "./LdapOrganizationsTable";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewLdapOrganizationModal from "./NewLdapOrganizationModal";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import {getLoadingErrorDialog} from "../../../../common/toasts/toasts";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getRoles();
    setIsLoading(false);
  };

  const loadOrganizations = async () => {
    try {
      const response = await accountsActions.getOrganizations(getAccessToken);
      setLdapOrganizationData(response.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

   if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <>
      <BreadcrumbTrail destination="ldapOrganizationManagement"/>
      {showToast && toast}

      <div className="max-content-width ml-2">
        <div className="justify-content-between mb-1 d-flex">
          <h5>Organization Management</h5>
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
        {ldapOrganizationData && <LdapOrganizationsTable isLoading={isLoading} data={ldapOrganizationData}/>}
        <NewLdapOrganizationModal showModal={showCreateOrganizationModal} loadData={loadData}
                                  setShowModal={setShowCreateOrganizationModal}/>
      </div>
    </>);
}

export default LdapOrganizationManagement;

