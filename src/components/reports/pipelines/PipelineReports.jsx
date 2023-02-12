import React from "react";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineReports() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <Row className="ml-4">
      <span>No Pipeline Reports exist yet.</span>
    </Row>
  );
}

