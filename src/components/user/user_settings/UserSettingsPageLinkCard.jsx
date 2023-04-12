import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserSettingsPageLinkCard() {
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

UserSettingsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default UserSettingsPageLinkCard;
