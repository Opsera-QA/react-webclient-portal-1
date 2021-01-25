import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import LoadingDialog from "components/common/status_notifications/loading";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getOrganizationByDomain} from "components/admin/accounts/ldap/organizations/organization-functions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [ldapOrganizationData, setLdapOrganizationData] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, [orgDomain]);

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

  const getGroupsByDomain = async (ldapDomain) => {
    if (ldapDomain != null) {
      try {
        let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
        setLdapOrganizationData(organization);
        setGroupList(organization["groups"]);
      } catch (error) {
        toastContext.showLoadingErrorDialog(error.message);
        console.error(error.message);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    setCurrentUserEmail(user.email);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (orgDomain != null && userRoleAccess.OpseraAdministrator) {
        await getGroupsByDomain(orgDomain);
      } else if (ldap.domain != null && authorizedActions.includes("get_groups")) {
        history.push(`/settings/${ldap.domain}/groups`);
        await getGroupsByDomain(ldap.domain);
      }
    }
  };

  // TODO: Remove after confirming it's not needed
  const getOrganizationListDropdown = () => {
    return (
      <div className="tableDropdown mr-2">
        {/*{accessRoleData.OpseraAdministrator && <LdapOrganizationSelectInput currentOrganizationDomain={currentOrganizationDomain} location={"groups"} />}*/}
      </div>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

    return (
      <ScreenContainer
        accessDenied={!authorizedActions.includes("get_groups") && !isLoading}
        isLoading={isLoading} breadcrumbDestination={"ldapGroupManagement"}
      >
        {/*{getOrganizationListDropdown()}*/}
        <LdapGroupsTable isLoading={isLoading} groupData={groupList} orgDomain={orgDomain} authorizedActions={authorizedActions} currentUserEmail={currentUserEmail} />
      </ScreenContainer>
    );
}


export default LdapGroupManagement;