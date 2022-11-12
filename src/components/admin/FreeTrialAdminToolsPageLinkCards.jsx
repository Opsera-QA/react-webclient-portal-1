import React from "react";
import FreeTrialCustomerWorkspaceManagementPageLinkCard
  from "components/admin/customer/workspace/free_trial/FreeTrialCustomerWorkspaceManagementPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function FreeTrialAdminToolsPageLinkCards() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    || isFreeTrial !== true
  ) {
    return null;
  }

  return (
    <>
      <FreeTrialCustomerWorkspaceManagementPageLinkCard />
    </>
  );
}

FreeTrialAdminToolsPageLinkCards.propTypes = {};
