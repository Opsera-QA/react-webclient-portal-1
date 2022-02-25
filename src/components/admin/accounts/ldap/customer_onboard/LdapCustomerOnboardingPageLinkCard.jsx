import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function LdapCustomerOnboardingPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"customerOnboarding"}
    />
  );
}

LdapCustomerOnboardingPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default LdapCustomerOnboardingPageLinkCard;
