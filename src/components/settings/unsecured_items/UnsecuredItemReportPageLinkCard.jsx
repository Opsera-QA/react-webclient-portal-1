import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

export default function UnsecuredItemReportPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"unsecuredItemReport"}
    />
  );
}

UnsecuredItemReportPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};
