import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function PipelineTemplateManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"templateManagement"}
    />
  );
}

PipelineTemplateManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default PipelineTemplateManagementPageLinkCard;
