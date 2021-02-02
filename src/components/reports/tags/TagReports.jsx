import React from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import Row from "react-bootstrap/Row";

function TagReports() {
  return (
    <Row className="ml-3">
      <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInPipelineReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInToolsReport"}/>
    </Row>
  );
}

export default TagReports;

