import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Sidebar from "components/sidebar/Sidebar";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function OpseraFreeTrialSettingsManagement() {
  const { isOpseraAdministrator } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialSettings"}
      pageDescription={"Manage Free Trial settings from this dashboard."}
      className={"mt-3"}
      includeSubNavigationGap={false}
    >
      <div className={"m-3"}>
        <div>This will eventually hold a link to all pages but for now showing the side bar so all main areas are accessible to Opsera Administrators</div>
        <Sidebar hideSideBar={false} />
      </div>
    </ScreenContainer>
  );
}
