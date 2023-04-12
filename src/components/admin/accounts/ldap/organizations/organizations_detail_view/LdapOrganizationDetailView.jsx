import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapOrganizationDetailPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailPanel";
import LdapOrganizationManagementSubNavigationBar
  from "components/admin/accounts/ldap/organizations/LdapOrganizationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOrganizationDetailView() {
  const { organizationName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [organizationName]);

  const loadData = async () => {
    try {
      setLdapOrganizationData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await loadOrganization();
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

  const loadOrganization = async () => {
    const response = await accountsActions.getOrganizationByNameV2(getAccessToken, cancelTokenSource, organizationName);
    const organization = response?.data;

    if (isMounted?.current === true && organization != null) {
      setLdapOrganizationData(new Model(organization, ldapOrganizationMetaData, false));
      setOrganizationAccounts(organization?.orgAccounts);
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
      breadcrumbDestination={"ldapOrganizationDetailView"}
      metadata={ldapOrganizationMetaData}
      dataObject={ldapOrganizationData}
      isLoading={isLoading}
      navigationTabContainer={<LdapOrganizationManagementSubNavigationBar activeTab={"organizationViewer"}/>}
      actionBar={getActionBar()}
      detailPanel={
        <LdapOrganizationDetailPanel
          organizationAccounts={organizationAccounts}
          ldapOrganizationData={ldapOrganizationData}
          loadData={loadData}
        />
      }
    />
  );
}

export default LdapOrganizationDetailView;