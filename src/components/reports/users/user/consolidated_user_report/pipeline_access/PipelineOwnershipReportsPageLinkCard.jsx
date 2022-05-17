import React, { useContext } from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import { AuthContext } from "../../../../../../contexts/AuthContext";

function PipelineOwnershipReportsPageLinkCard() {
  const {isSassUser } = useContext(AuthContext);
  if (
    isSassUser() === false
  ) {
    return null;
  }
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
