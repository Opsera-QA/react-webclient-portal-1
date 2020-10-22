import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../../admin/accounts/accounts-actions";
import LoadingDialog from "../../../common/status_notifications/loading";
import Model from "../../../../core/data_model/model";
import {ldapUsersMetaData} from "../ldap-users-metadata";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import DataNotFoundContainer from "../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../common/status_notifications/data_not_found/DataNotFoundDialog";

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

    if (response != null && response.data != null) {
      setLdapUserData(new Model(response.data, ldapUsersMetaData, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (userRoleAccess.OpseraAdministrator || ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, userEmail, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);

        if (authorizedActions.includes("get_user_details")) {
          await getLdapUser(userEmail);
        }
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_user_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  if (!isLoading && ldapUserData == null) {
    return (
      <DataNotFoundContainer
        type={"User"}
        breadcrumbDestination={(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) ? "ldapUserDetailView" : "ldapUserDetailViewLimited"}>
        <DataNotFoundDialog type={"User"} managementViewIcon={faUser} managementViewTitle={"User Management"} managementViewLink={"/settings/users"} />
      </DataNotFoundContainer>
    )
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) ? "ldapUserDetailView" : "ldapUserDetailViewLimited"}
      title={ldapUserData != null ? `User Details [${ldapUserData["name"]}]` : undefined}
      titleIcon={faUser}
      isLoading={isLoading}
      summaryPanel={<LdapUserSummaryPanel ldapUserData={ldapUserData} orgDomain={orgDomain}/>}
      detailPanel={<LdapUserDetailPanel setLdapUserData={setLdapUserData} orgDomain={orgDomain} ldapUserData={ldapUserData} authorizedActions={authorizedActions}/>}
    />
  );
}

export default LdapUserDetailView;