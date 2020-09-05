import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ErrorDialog from "../../../../common/status_notifications/error";
import LoadingDialog from "../../../../common/status_notifications/loading";
import "../../accounts.css";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import LdapOrganizationAccountsTable from "./LdapOrganizationAccountsTable";
import {getOrganizationDropdownList} from "../organizations/organization-functions";
import {useHistory, useParams} from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewLdapOrganizationAccountModal from "./NewLdapOrganizationAccountModal";

function LdapOrganizationAccountManagement() {
  const history = useHistory();
  const { organizationName } = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [organizations, setOrganizations] = useState(undefined);
  const [currentOrganizationName, setCurrentOrganizationName] = useState(undefined);
  const [showCreateOrganizationAccountModal, setShowCreateOrganizationAccountModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await getRoles();
    setLoading(false);
  };

  const loadOrganizationByName = async (name) => {
    try {
      if (name != null) {
        const response = await accountsActions.getOrganizationByName(name, getAccessToken);
        setLdapOrganizationData(response.data);
        setOrganizationAccounts(response.data["orgAccounts"]);
      }
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      if (userRoleAccess.OpseraAdministrator) {

        if (organizationName != null) {
          setCurrentOrganizationName(organizationName);
          await loadOrganizationByName(organizationName);
        } else if ((userRoleAccess.Administrator || userRoleAccess.PowerUser) && ldap.domain != null) {
          history.push(`/accounts/organization-accounts/${ldap.organization}`);
          setCurrentOrganizationName(ldap.organization);
          await loadOrganizationByName(ldap.organization);
        }

          let organizationList = await getOrganizationDropdownList("name", getAccessToken);
          setOrganizations(organizationList);
      }
    }
  };

  const handleOrganizationChange = async (selectedOption) => {
    history.push(`/accounts/organization-accounts/${selectedOption.id}/`);
    setCurrentOrganizationName(selectedOption.id);
    await loadOrganizationByName(selectedOption.id);
  };

  if (!accessRoleData || loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationAccountManagement" />

        <div className="max-content-width ml-2">
          <div className="justify-content-between mb-1 d-flex">
            <h5>Organization Account Management</h5>
            <div className="d-flex">
              <div className="tableDropdown mr-2">
                {accessRoleData.OpseraAdministrator && organizations && <DropdownList
                  data={organizations}
                  value={currentOrganizationName}
                  filter="contains"
                  valueField='id'
                  textField='text'
                  placeholder="Select an Organization Account"
                  groupBy={org => org["groupId"]}
                  onChange={handleOrganizationChange}
                />}
              </div>
              <div className="my-1 text-right">
                <Button variant="primary" size="sm"
                        onClick={() => {
                          setShowCreateOrganizationAccountModal(true);
                        }}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Organization Account
                </Button>
              </div>
            </div>
          </div>

          {error &&
          <div className="absolute-center-content"><ErrorDialog align="center" error={error.message} /></div>}
          {organizationAccounts && <LdapOrganizationAccountsTable showDropdown={true} ldapOrganizationAccounts={organizationAccounts} loadData={loadData}  />}
        </div>
        <NewLdapOrganizationAccountModal ldapOrganizationData={ldapOrganizationData} showModal={showCreateOrganizationAccountModal} loadData={loadData} setShowModal={setShowCreateOrganizationAccountModal}/>
  </>);
  }
}

export default LdapOrganizationAccountManagement;

