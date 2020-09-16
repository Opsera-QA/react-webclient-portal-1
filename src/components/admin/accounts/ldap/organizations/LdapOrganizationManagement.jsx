import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../../contexts/AuthContext";
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
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadOrganizations = async () => {
    try {
      const response = await accountsActions.getOrganizations(getAccessToken);
      setLdapOrganizationData(response.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
  };

  const createOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      console.log("Authorized Actions: " + JSON.stringify(authorizedActions));

      if (userRoleAccess.OpseraAdministrator) {
        await loadOrganizations();
      }
      else if (ldap.organization != null && authorizedActions.includes("get_organization_details")) {
        history.push(`/admin/organizations/details/${ldap.organization}`);
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
        <LdapOrganizationsTable isLoading={isLoading} data={ldapOrganizationData}/>
        <NewLdapOrganizationModal showModal={showCreateOrganizationModal} loadData={loadData}
                                  setShowModal={setShowCreateOrganizationModal}/>
      </div>
    </>);
}

export default LdapOrganizationManagement;

