import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import FreeTrialCustomerWorkspaceUsersTable
  from "components/admin/customer/workspace/free_trial/FreeTrialCustomerWorkspaceUsersTable";

export default function FreeTrialCustomerWorkspaceManagement() {
  const [ssoUsers, setSsoUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setSsoUsers([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setSsoUsers([]);
      setIsLoading(true);
      await getPlatformUsers();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPlatformUsers = async () => {
    const response = await ssoUserActions.getPlatformUsers(
      getAccessToken,
      cancelTokenSource,
    );
    const users = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(users)) {
      setSsoUsers([...users]);
    }
  };

  return (
    <ScreenContainer
      className={"mt-3"}
      breadcrumbDestination={"freeTrialCustomerWorkspaceManagement"}
      includeSubNavigationGap={false}
    >
      <FreeTrialCustomerWorkspaceUsersTable
        loadData={loadData}
        isLoading={isLoading}
        ssoUsers={ssoUsers}
      />
    </ScreenContainer>
  );
}
