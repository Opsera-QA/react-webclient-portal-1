import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function PipelineStorageManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"pipelineStorageManagement"}
    />
  );
}

PipelineStorageManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default PipelineStorageManagementPageLinkCard;
