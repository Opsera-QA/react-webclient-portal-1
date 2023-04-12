import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function LdapDepartmentManagementPageLinkCard() {
  const {
    isSaasUser,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (isSaasUser !== false || isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapDepartmentManagement"}
    />
  );
}

LdapDepartmentManagementPageLinkCard.propTypes = {};
