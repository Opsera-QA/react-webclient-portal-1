import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserSettingsPageLinkCard() {
  const {
    isSaasUser,
    isOpseraAdministrator,
    isSiteAdministrator,
    isPowerUser,
  } = useComponentStateReference();

  if (isSaasUser !== false ||
    (isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isPowerUser !== true)
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"myUserRecord"}
    />
  );
}

UserSettingsPageLinkCard.propTypes = {};
