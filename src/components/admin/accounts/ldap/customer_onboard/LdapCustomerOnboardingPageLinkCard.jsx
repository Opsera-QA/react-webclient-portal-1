import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapCustomerOnboardingPageLinkCard() {
  const { isOpseraAdministrator } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"customerOnboarding"}
    />
  );
}

LdapCustomerOnboardingPageLinkCard.propTypes = {};
