import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

export default function UsersSiteRolePageLinkCard() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  if (isSiteAdministrator !== true && isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapUsersSiteRoleDetailView"}
      pathParameter={userData}
    />
  );
}