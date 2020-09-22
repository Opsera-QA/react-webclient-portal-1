import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";

import "../../../accounts.css";
import BreadcrumbTrail from "../../../../../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import {ldapOrganizationMetaData} from "../ldap-organizations-form-fields";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSitemap} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";

function LdapOrganizationDetailView() {
  const { organizationName } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedOrganizationAccountActions, setAuthorizedOrganizationAccountActions] = useState([]);


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

  const getRoles = async () => {
    const user = await getUserRecord();
    let {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      setAccessRoleData(userRoleAccess);

      let authorizedOrganizationAccountActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedOrganizationAccountActions(authorizedOrganizationAccountActions);

      if (authorizedActions.includes("get_organization_details")) {
        await loadOrganization();
      }
    }
  };

  const loadOrganization = async () => {
    try {
      const response = await accountsActions.getOrganizationByName(organizationName, getAccessToken);
      // console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setLdapOrganizationData(new Model(response.data, ldapOrganizationMetaData, false));
      setOrganizationAccounts(response.data["orgAccounts"]);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error.message);
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_details") && !isLoading) {
    return <AccessDeniedDialog roleData={accessRoleData}/>;
  }

    return (
      <>
        <BreadcrumbTrail destination="ldapOrganizationDetailView"/>
        {ldapOrganizationData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h6><FontAwesomeIcon icon={faSitemap} fixedWidth className="mr-1" />Organization Details [{ldapOrganizationData && ldapOrganizationData["name"]}]</h6>
          </div>
          <div className="detail-view-body">
            <div>
              <LdapOrganizationSummaryPanel ldapOrganizationData={ldapOrganizationData}/>
            </div>
            <div>
              <LdapOrganizationDetailPanel organizationAccounts={organizationAccounts}
                                           ldapOrganizationData={ldapOrganizationData}
                                           setLdapOrganizationData={setLdapOrganizationData}
                                           authorizedOrganizationAccountActions={authorizedOrganizationAccountActions}
                                           loadData={loadData}
                                           authorizedActions={authorizedActions}
              />
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>

        }
      </>);
}

export default LdapOrganizationDetailView;