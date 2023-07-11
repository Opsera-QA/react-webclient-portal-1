import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineTemplateManagementPageLinkCard() {
  const { isOpseraAdministrator } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"templateManagement"}
    />
  );
}

PipelineTemplateManagementPageLinkCard.propTypes = {};
