import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccountSettingsSubNavigationBar from "components/settings/AccountSettingsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSettingsPageLinkCards from "components/settings/pipelines/PipelineSettingsPageLinkCards";

export default function PipelineSettings() {
  const {
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isSaasUser !== true
    && isPowerUser !== true
    && isOpseraAdministrator !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelineSettings"}
      navigationTabContainer={
        <AccountSettingsSubNavigationBar
          activeTab={"pipelineSettings"}
        />
      }
    >
      <PipelineSettingsPageLinkCards />
    </ScreenContainer>
  );
}

