import React, {useContext, useState, useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationDetailPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailPanel";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function LdapOrganizationDetailView() {
  const history = useHistory();
  const { organizationName } = useParams();
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);
  const [authorizedOrganizationAccountActions, setAuthorizedOrganizationAccountActions] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [organizationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    let {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      if (organizationName == null || (!userRoleAccess?.OpseraAdministrator && ldap?.organization !== organizationName)) {
        history.push(`/admin/organizations/details/${ldap.organization}`);
      }

      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      setAccessRoleData(userRoleAccess);

      let authorizedOrganizationAccountActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedOrganizationAccountActions(authorizedOrganizationAccountActions);

      if (authorizedActions?.includes("get_organization_details")) {
        await loadOrganization(cancelSource);
      }
    }
  };

  const loadOrganization = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getOrganizationByNameV2(getAccessToken, cancelSource, organizationName);

    if (isMounted?.current === true && response?.data != null) {
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
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationDetailView"}
      metadata={ldapOrganizationMetaData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
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