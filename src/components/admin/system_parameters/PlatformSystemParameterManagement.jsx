import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformSystemParameterManagementSubNavigationBar
  from "components/admin/system_parameters/PlatformSystemParameterManagementSubNavigationBar";
import { platformSystemParameterActions } from "components/admin/system_parameters/platformSystemParameter.actions";
import PlatformSystemParameterTable from "components/admin/system_parameters/PlatformSystemParameterTable";

export default function PlatformSystemParameterManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [systemParameters, setSystemParameters] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    isOpseraAdministrator,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setSystemParameters([]);

    if (isOpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted === true) {
          throw error;
        }
      });
    }
  }, [accessRoleData]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTemplates();
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

  const getTemplates = async () => {
    const response = await platformSystemParameterActions.getPlatformSystemParameters(
      getAccessToken,
      cancelTokenSource,
    );
    const parameters = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(parameters)) {
      setSystemParameters([...parameters]);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"platformSystemParameterManagement"}
      isLoading={isLoading}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <PlatformSystemParameterManagementSubNavigationBar
          activeTab={"platformSystemParameterManagement"}
        />
      }
    >
      <PlatformSystemParameterTable
        systemParameters={systemParameters}
        isLoading={isLoading}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}