import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function PipelineOwnershipReportsPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"pipelineOwnershipReport"}
    />
  );
}

PipelineOwnershipReportsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default PipelineOwnershipReportsPageLinkCard;
