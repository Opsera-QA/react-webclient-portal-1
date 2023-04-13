import React, { useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AdminToolsSubNavigationBar from "components/admin/AdminToolsSubNavigationBar";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";
import AdministrationToolsHelpDocumentation
  from "../common/help/documentation/admin_tools/AdministrationToolsHelpDocumentation";
import FreeTrialAdminToolsPageLinkCards from "components/admin/FreeTrialAdminToolsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

function AdminTools() {
  const {
    accessRoleData,
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {}, []);

  const getHelpComponent = () => {
    return (<AdministrationToolsHelpDocumentation/>);
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"admin"}
      pageDescription={"Listed below are administration tools for the platform."}
      helpComponent={getHelpComponent()}
      navigationTabContainer={<AdminToolsSubNavigationBar activeTab={"adminTools"} />}
    >
      <AdminToolsPageLinkCards
        accessRoleData={accessRoleData}
      />
      <FreeTrialAdminToolsPageLinkCards />
    </ScreenContainer>
  );
}

export default AdminTools;
