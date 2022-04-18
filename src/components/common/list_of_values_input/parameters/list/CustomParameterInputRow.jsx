import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RemoveListItemBadge from "components/common/badges/general/RemoveListItemBadge";

function CustomParameterInputRow(
  {
    parameter,
    deleteParameterFunction,
    index,
    disabled,
  }) {

  if (parameter == null) {
    return null;
  }

  return (
    <Row className={"py-2"}>
      <Col xs={5}>
        {parameter?.parameterName}
      </Col>
      <Col xs={5}>
        {parameter?.outputKey != null ? "Terraform Output" : "Tool Registry"}
      </Col>
      <Col xs={2}>
        <RemoveListItemBadge
          disabled={disabled}
          deleteValueFunction={() => deleteParameterFunction(index)}
        />
      </Col>
    </Row>
  );
}

CustomParameterInputRow.propTypes = {
  parameter: PropTypes.object,
  index: PropTypes.number,
  deleteParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomParameterInputRow;