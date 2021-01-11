import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import "../../../accounts.css";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../../../core/data_model/model";
import accountsActions from "../../../accounts-actions";
import {ldapOrganizationAccountMetaData} from "../ldap-organization-account-form-fields";
import LdapOrganizationAccountDetailPanel from "./LdapOrganizationAccountDetailPanel";
import {faSitemap, faUsers, faWrench} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import departmentActions from "../../ldap_departments/department-functions";
import DetailScreenContainer from "../../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../../common/actions/buttons/ActionBarBackButton";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [organizationName, setOrganizationName] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedIdpActions, setAuthorizedIdpActions] = useState([]);
  const [authorizedDepartmentActions, setAuthorizedDepartmentActions] = useState([]);


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
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      let authorizedIdpActions = await accountsActions.getAllowedIdpAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedIdpActions(authorizedIdpActions);
      let authorizedDepartmentActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedDepartmentActions(authorizedDepartmentActions);

      if (authorizedActions.includes("get_organization_account_details")) {
        await loadOrganizationAccount();
      }

      if (authorizedDepartmentActions.includes("get_department_details")) {
        await loadDepartments();
      }
    }
  };

  const loadOrganizationAccount = async () => {
      const response = await accountsActions.getOrganizationAccountByDomain(organizationDomain, getAccessToken);

      if (response != null && response.data != null) {
        setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
        setOrganizationName(response.data["org"]["name"]);
      }
  };

  const loadDepartments = async () => {
    const response = await departmentActions.getDepartmentsByDomain(organizationDomain, getAccessToken);

    if (response != null && response.data != null) {
      setLdapDepartmentData(response.data);
    }
  };


  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/organizations"} />
        </div>
        <div>
          {/*<ActionBarToggleButton status={ldapOrganizationAccountData?.getData("active")} handleActiveToggle={handleActiveToggle} />*/}
        </div>
      </ActionBarContainer>
    );
  };

  if (!authorizedActions.includes("get_organization_account_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountDetailView"}
      title={ldapOrganizationAccountData != null ? `Organization Account Details [${ldapOrganizationAccountData["name"]}]` : undefined}
      managementViewLink={"/admin/organizations"}
      managementTitle={"Organization Management"}
      managementViewIcon={faSitemap}
      type={"Organization Account"}
      titleIcon={faUsers}
      dataObject={ldapOrganizationAccountData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationAccountDetailPanel
          authorizedActions={authorizedActions}
          authorizedIdpActions={authorizedIdpActions}
          authorizedDepartmentActions={authorizedDepartmentActions}
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          setLdapOrganizationAccountData={setLdapOrganizationAccountData}
          loadData={loadData}
          ldapDepartmentData={ldapDepartmentData}
          organizationDomain={organizationDomain}
        />
      }
    />
  );
}

export default LdapOrganizationAccountDetailView;