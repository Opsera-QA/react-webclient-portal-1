import React, {useContext, useState, useEffect, useRef} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import AccountSettingsSubNavigationBar from "components/settings/AccountSettingsSubNavigationBar";
import AccountSettingsPageLinkCards from "components/settings/AccountSettingsPageLinkCards";

function AccountSettings() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async () => {
    const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (accessRoleData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"accountSettings"}
      pageDescription={"Manage account settings from this dashboard."}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator && !accessRoleData?.SassPowerUser}
      isLoading={isLoading}
      navigationTabContainer={<AccountSettingsSubNavigationBar activeTab={"accountSettings"} />}
    >
      <AccountSettingsPageLinkCards accessRoleData={accessRoleData} />
    </ScreenContainer>
  );
}

export default AccountSettings;

