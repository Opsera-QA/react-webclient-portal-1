import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PlatformSystemParameterManagementPageLinkCard() {
  const {
    accessRoleData,
  } = useComponentStateReference();

  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"platformSystemParameterManagement"}
    />
  );
}

PlatformSystemParameterManagementPageLinkCard.propTypes = {};
