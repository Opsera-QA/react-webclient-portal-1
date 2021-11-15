import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import AdminToolsSubNavigationBar from "components/admin/AdminToolsSubNavigationBar";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";

function AdminTools() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"admin"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      pageDescription={"Listed below are administration tools for the platform."}
      navigationTabContainer={<AdminToolsSubNavigationBar activeTab={"adminTools"} />}
    >
      <AdminToolsPageLinkCards
        accessRoleData={accessRoleData}
      />
    </ScreenContainer>
  );
}

export default AdminTools;
