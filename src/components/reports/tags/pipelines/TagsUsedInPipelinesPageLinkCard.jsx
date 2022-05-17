import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function TagsUsedInPipelinesPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"tagsUsedInPipelineReport"}
    />
  );
}

TagsUsedInPipelinesPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default TagsUsedInPipelinesPageLinkCard;
