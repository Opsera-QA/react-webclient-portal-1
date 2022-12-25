import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";
import BreadcrumbPageLinkSelectionCardBase from "components/common/card/selection/BreadcrumbPageLinkSelectionCardBase";

export default function SiteRoleManagementPageLinkCardBase(
  {
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
    <BreadcrumbPageLinkSelectionCardBase
      breadcrumbDestination={breadcrumbDestination}
      pathParameter={userData}
      className={"my-2"}
    />
  );
}

SiteRoleManagementPageLinkCardBase.propTypes = {
  siteRole: PropType.object,
  breadcrumbDestination: PropType.string,
};
