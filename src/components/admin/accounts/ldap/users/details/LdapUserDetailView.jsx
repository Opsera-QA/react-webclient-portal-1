import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/admin/accounts/ldap/users/ldapUser.metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapUserDetailPanel from "components/admin/accounts/ldap/users/details/LdapUserDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapUserDetailView() {
  const {emailAddress, organizationDomain} = useParams();
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpseraAdministrator,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator === true) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getLdapUser();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getLdapUser = async () => {
    const response = await accountsActions.getUserByEmail(emailAddress, getAccessToken);

    if (response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
    }
  };

  const getActionBar = () => {
    if (ldapUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={`/admin/organization-accounts/${organizationDomain}/details`} />
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapUserDetailView"}
      metadata={ldapUserMetadata}
      dataObject={ldapUserData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <LdapUserDetailPanel
          setLdapUserData={setLdapUserData}
          orgDomain={organizationDomain}
          ldapUserData={ldapUserData}
        />
      }
    />
  );
}

export default LdapUserDetailView;