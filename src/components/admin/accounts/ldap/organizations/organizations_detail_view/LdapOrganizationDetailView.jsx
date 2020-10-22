import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";

import "../../../accounts.css";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import {ldapOrganizationMetaData} from "../ldap-organizations-form-fields";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";
import {faFileInvoice, faSitemap} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../../../common/panels/detail_view_container/DetailViewContainer";
import DataNotFoundContainer from "../../../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../../../common/status_notifications/data_not_found/DataNotFoundDialog";

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
    const response = await accountsActions.getOrganizationByName(organizationName, getAccessToken);

    if (response != null && response.data != null) {
      setLdapOrganizationData(new Model(response.data, ldapOrganizationMetaData, false));
      setOrganizationAccounts(response.data["orgAccounts"]);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_details") && !isLoading) {
    return <AccessDeniedDialog roleData={accessRoleData}/>;
  }

  if (!isLoading && ldapOrganizationData == null) {
    return (
      <DataNotFoundContainer type={"Organization"} breadcrumbDestination={"ldapOrganizationDetailView"}>
        <DataNotFoundDialog type={"Organization"} managementViewIcon={faSitemap} managementViewTitle={"Organization Management"} managementViewLink={"/admin/organizations"} />
      </DataNotFoundContainer>
    )
  }

    return (
      <DetailViewContainer
        breadcrumbDestination={"ldapOrganizationDetailView"}
        title={ldapOrganizationData != null ? `Organization Details [${ldapOrganizationData["name"]}]` : undefined}
        titleIcon={faSitemap}
        isLoading={isLoading}
        summaryPanel={<LdapOrganizationSummaryPanel ldapOrganizationData={ldapOrganizationData}/>}
        detailPanel={  <LdapOrganizationDetailPanel organizationAccounts={organizationAccounts}
                                                    ldapOrganizationData={ldapOrganizationData}
                                                    setLdapOrganizationData={setLdapOrganizationData}
                                                    authorizedOrganizationAccountActions={authorizedOrganizationAccountActions}
                                                    loadData={loadData}
                                                    authorizedActions={authorizedActions}
        />}
      />
    );
}

export default LdapOrganizationDetailView;