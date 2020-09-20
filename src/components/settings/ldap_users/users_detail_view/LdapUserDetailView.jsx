import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../../admin/accounts/accounts-actions";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/status_notifications/loading";
import Model from "../../../../core/data_model/model";
import {ldapUsersMetaData} from "../ldap-users-metadata";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function LdapUserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);
    console.log("response: " + JSON.stringify(response.data));
    setLdapUserData(new Model(response.data, ldapUsersMetaData, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, userEmail, getUserRecord, getAccessToken);
        console.log("Authorized Actions: " + JSON.stringify(authorizedActions));
        setAuthorizedActions(authorizedActions);

        if (authorizedActions.includes("get_user_details")) {
          await getLdapUser(userEmail);
        }
      }
    }
  };

  if (isLoading || !accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_user_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <>
      {/*TODO: The permissions matrix says that users can see all users. If necessary, change this to allowedActions.includes("get_users")*/}
      <BreadcrumbTrail destination={(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) ? "ldapUserDetailView" : "ldapUserDetailViewLimited"} />
      {ldapUserData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header">
          <h5><FontAwesomeIcon icon={faUser} fixedWidth className="mr-1"/>LDAP User Details
            [{ldapUserData && ldapUserData["name"]}]</h5></div>
        <div className="detail-view-body">
          <div>
            <LdapUserSummaryPanel ldapUserData={ldapUserData} orgDomain={orgDomain}/>
          </div>
          <div>
            <LdapUserDetailPanel setLdapUserData={setLdapUserData} orgDomain={orgDomain} ldapUserData={ldapUserData} authorizedActions={authorizedActions}/>
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
      }
    </>
  );
}

export default LdapUserDetailView;