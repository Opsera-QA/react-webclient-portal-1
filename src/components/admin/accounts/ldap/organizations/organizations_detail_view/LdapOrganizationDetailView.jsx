import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../../common/status_notifications/loading";

import "../../../accounts.css";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import {ldapOrganizationMetaData} from "../ldap-organizations-form-fields";
import accountsActions from "../../../accounts-actions";
import LdapOrganizationDetailPanel from "./LdapOrganizationDetailPanel";
import {faSitemap} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../../common/actions/buttons/ActionBarBackButton";

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

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/organizations"} />
        </div>
        <div>
          {/*<ActionBarToggleButton status={ldapOrganizationData?.getData("active")} handleActiveToggle={handleActiveToggle} />*/}
        </div>
      </ActionBarContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_organization_details") && !isLoading) {
    return <AccessDeniedDialog roleData={accessRoleData}/>;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationDetailView"}
      title={ldapOrganizationData != null ? `Organization Details [${ldapOrganizationData["name"]}]` : undefined}
      managementViewLink={"/admin/organizations"}
      managementTitle={"Organization Management"}
      managementViewIcon={faSitemap}
      type={"Organization"}
      titleIcon={faSitemap}
      dataObject={ldapOrganizationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationDetailPanel
          organizationAccounts={organizationAccounts}
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