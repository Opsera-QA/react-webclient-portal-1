import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformSettingsManagementSubNavigationBar
  from "components/admin/platform_settings/PlatformSettingsManagementSubNavigationBar";
import { platformSettingsActions } from "components/admin/platform_settings/platformSettings.actions";
import PlatformSettingsTable from "components/admin/platform_settings/PlatformSettingsTable";

export default function PlatformSettingsManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [platformSettings, setPlatformSettings] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    isOpseraAdministrator,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPlatformSettings([]);

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
      await getPlatformSettingsRecords();
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

  const getPlatformSettingsRecords = async () => {
    const response = await platformSettingsActions.getPlatformSettingRecords(
      getAccessToken,
      cancelTokenSource,
    );
    const settings = response?.data?.data;
    console.log("response: " + JSON.stringify(response));

    if (isMounted?.current === true && Array.isArray(settings)) {
      setPlatformSettings([...settings]);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"platformSettingsManagement"}
      isLoading={isLoading}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <PlatformSettingsManagementSubNavigationBar
          activeTab={"platformSettingsManagement"}
        />
      }
    >
      <PlatformSettingsTable
        platformSettings={platformSettings}
        isLoading={isLoading}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}