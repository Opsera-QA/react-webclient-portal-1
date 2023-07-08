import React from "react";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApiRequestFieldTypeField from "components/common/list_of_values_input/api/request/body/ApiRequestFieldTypeField";

export default function EndpointRequestParameterFieldSummaryPanel(
  {
    model,
    className,
  }) {
  if (model == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={model?.getData("fieldName")}
      />
      <Row>
        <Col xs={12}>
          <ApiRequestFieldTypeField
            model={model}
            fieldName={"type"}
          />
        </Col>
        <Col xs={6}>
          <BooleanField
            dataObject={model}
            fieldName={"isSensitiveData"}
          />
        </Col>
        <Col xs={6}>
          <BooleanField
            dataObject={model}
            fieldName={"isRequired"}
          />
        </Col>
        <Col xs={6}>
          <BooleanField
            dataObject={model}
            fieldName={"useRunApiResponseParameter"}
          />
        </Col>
      </Row>
    </div>
  );
}

EndpointRequestParameterFieldSummaryPanel.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
};
