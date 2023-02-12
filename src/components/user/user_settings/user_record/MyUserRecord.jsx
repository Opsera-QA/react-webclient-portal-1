import React, {useState, useEffect, useContext} from "react";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import LdapUserDetailPanel from "components/settings/ldap_users/users_detail_view/LdapUserDetailPanel";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import useComponentStateReference from "hooks/useComponentStateReference";

function MyUserRecord() {
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    cancelTokenSource,
    isMounted,
    userData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getLdapUser();
    }
    catch (error) {
      if (isMounted.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getLdapUser = async () => {
    const response = await accountsActions.getUserByEmailV2(getAccessToken, cancelTokenSource, userData?.email);

    if (isMounted.current === true && response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.MY_USER_RECORD} />}
      breadcrumbDestination={USER_SETTINGS_PAGES.MY_USER_RECORD}
      isLoading={isLoading}
    >
      <LdapUserDetailPanel
        setLdapUserData={setLdapUserData}
        orgDomain={userData?.ldap?.domain}
        ldapUserData={ldapUserData}
        hideSettings={true}
      />
    </ScreenContainer>
  );
}

export default MyUserRecord;