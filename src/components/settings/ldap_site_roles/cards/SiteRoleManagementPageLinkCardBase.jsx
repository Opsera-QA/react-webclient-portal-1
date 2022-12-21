import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";

export default function SiteRoleManagementPageLinkCardBase(
  {
    siteRole,
    breadcrumbDestination,
  }) {
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
      breadcrumbDestination={breadcrumbDestination}
      pathParameter={userData}
    />
  );
}

SiteRoleManagementPageLinkCardBase.propTypes = {
  siteRole: PropType.object,
  breadcrumbDestination: PropType.string,
};
