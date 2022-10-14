import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UnsecuredItemReportPageLinkCard() {
  const {
    isSiteAdministrator,
    isSaasUser,
  } = useComponentStateReference();

  if (
    isSaasUser !== false
    || isSiteAdministrator !== true
  ) {
    return null;
  }
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"unsecuredItemReport"}
    />
  );
}

UnsecuredItemReportPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};
