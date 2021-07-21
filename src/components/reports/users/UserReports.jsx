import React from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import Row from "react-bootstrap/Row";

function UserReports() {
  return (
    <Row className="ml-3">
      <BreadcrumbPageLink breadcrumbDestination={"groupMembershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"pipelineOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"toolOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"taskOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"consolidatedUserReport"}/>
    </Row>
  );
}

export default UserReports;

