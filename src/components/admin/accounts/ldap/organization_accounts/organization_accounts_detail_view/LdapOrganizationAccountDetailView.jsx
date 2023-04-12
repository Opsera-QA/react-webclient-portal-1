import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Model from "core/data_model/model";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationAccountDetailPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailPanel";
import LdapOrganizationAccountManagementSubNavigationBar
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOrganizationAccountDetailView() {
  const { organizationDomain } = useParams();
  const [isLoading, setIsLoading] = useState(false); //this is how we toggle showing/hiding stuff when API calls or other functions are loading
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);
  const {
    getAccessToken,
    toastContext,
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [organizationDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await loadOrganizationAccount(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadOrganizationAccount = async () => {
      const response = await accountsActions.getOrganizationAccountByDomainV2(getAccessToken, cancelTokenSource, organizationDomain);

      if (response?.data != null) {
        setLdapOrganizationAccountData(new Model(response.data, ldapOrganizationAccountMetaData, false));
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

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountDetailView"}
      metadata={ldapOrganizationAccountMetaData}
      dataObject={ldapOrganizationAccountData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <LdapOrganizationAccountManagementSubNavigationBar
          activeTab={"organizationAccountViewer"}
        />
      }
      detailPanel={
        <LdapOrganizationAccountDetailPanel
          isMounted={isMounted}
          cancelTokenSource={cancelTokenSource}
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          setLdapOrganizationAccountData={setLdapOrganizationAccountData}
          loadData={loadData}
          currentUser={userData}
          organizationDomain={organizationDomain}
        />
      }
    />
  );
}

export default LdapOrganizationAccountDetailView;