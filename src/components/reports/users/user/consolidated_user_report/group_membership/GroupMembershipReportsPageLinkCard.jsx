import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function GroupMembershipReportsPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"groupMembershipReport"}
    />
  );
}

GroupMembershipReportsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default GroupMembershipReportsPageLinkCard;
