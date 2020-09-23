import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../common/status_notifications/loading";
import "../../accounts.css";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import LdapOrganizationAccountsTable from "./LdapOrganizationAccountsTable";
import {getOrganizationDropdownList} from "../organizations/organization-functions";
import {useHistory, useParams} from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";
import ToastContext from "react-bootstrap/cjs/ToastContext";

function LdapOrganizationAccountManagement() {
  const history = useHistory();
  const { organizationName } = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [organizations, setOrganizations] = useState(undefined);
  const [currentOrganizationName, setCurrentOrganizationName] = useState(undefined);
  const toastContext = useContext(ToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);

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

  const loadOrganizationByName = async (name) => {
    try {
      if (name != null) {
        const response = await accountsActions.getOrganizationByName(name, getAccessToken);
        setLdapOrganizationData(response.data);
        setOrganizationAccounts(response.data["orgAccounts"]);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess.OpseraAdministrator) {
        let organizationList = await getOrganizationDropdownList("name", getAccessToken);
        setOrganizations(organizationList);

        if (organizationName != null) {
          setCurrentOrganizationName(organizationName);
          await loadOrganizationByName(organizationName);
        }
        else
        {
          history.push(`/admin/organization-accounts/${ldap.organization}`);
          setCurrentOrganizationName(ldap.organization);
          await loadOrganizationByName(ldap.organization);
        }
      } else if (ldap.organization != null && authorizedActions.includes("get_organization_accounts")) {
        history.push(`/admin/organization-accounts/${ldap.organization}`);
        setCurrentOrganizationName(ldap.organization);
        await loadOrganizationByName(ldap.organization);
      }
    }
  };

  const handleOrganizationChange = async (selectedOption) => {
    history.push(`/admin/organization-accounts/${selectedOption.id}`);
    setCurrentOrganizationName(selectedOption.id);
    setIsLoading(true);
    await loadOrganizationByName(selectedOption.id);
    setIsLoading(false);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_accounts") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationAccountManagement" />
        <div className="max-content-width ml-2">
          <div className="justify-content-between mb-1 d-flex">
            <h5>Organization Account Management</h5>
          </div>
          <LdapOrganizationAccountsTable
            isLoading={isLoading}
            authorizedActions={authorizedActions}
            ldapOrganizationData={ldapOrganizationData}
            showDropdown={true}
            ldapOrganizationAccounts={organizationAccounts}
            organizations={organizations}
            currentOrganizationName={currentOrganizationName}
            handleOrganizationChange={handleOrganizationChange}
            loadData={loadData}
          />
        </div>
      </>);
}

export default LdapOrganizationAccountManagement;

