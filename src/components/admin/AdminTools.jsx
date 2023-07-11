import React, { useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AdminToolsSubNavigationBar from "components/admin/AdminToolsSubNavigationBar";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";
import AdministrationToolsHelpDocumentation from "../common/help/documentation/admin_tools/AdministrationToolsHelpDocumentation";
import FreeTrialAdminToolsPageLinkCards from "components/admin/FreeTrialAdminToolsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function AdminTools() {
  const { isOpseraAdministrator,} = useComponentStateReference();

  useEffect(() => {}, []);

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"admin"}
      pageDescription={"Listed below are administration tools for the platform."}
      helpComponent={<AdministrationToolsHelpDocumentation />}
      navigationTabContainer={<AdminToolsSubNavigationBar activeTab={"adminTools"} />}
    >
      <AdminToolsPageLinkCards />
      <FreeTrialAdminToolsPageLinkCards />
    </ScreenContainer>
  );
}
