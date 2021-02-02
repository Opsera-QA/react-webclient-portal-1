import React from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import Row from "react-bootstrap/Row";

function ToolReports() {
  return (
    <Row className="ml-3">
      <BreadcrumbPageLink breadcrumbDestination={"toolsUsedInPipelineReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"toolCountsReport"}/>
    </Row>
  );
}

export default ToolReports;

