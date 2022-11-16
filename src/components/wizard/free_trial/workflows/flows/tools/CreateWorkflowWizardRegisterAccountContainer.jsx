import React from "react";
import * as PropType from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function CreateWorkflowWizardRegisterAccountContainer(
  {
    children,
  }) {
  return (
    <Row>
      <Col xs={0} sm={0} md={0} lg={1} xl={2} />
      <Col xs={12} sm={12} md={12} lg={10} xl={8}>
        {children}
      </Col>
      <Col xs={0} sm={0} md={0} lg={1} xl={2} />
    </Row>
  );
}

CreateWorkflowWizardRegisterAccountContainer.propTypes = {
  children: PropType.any,
};

