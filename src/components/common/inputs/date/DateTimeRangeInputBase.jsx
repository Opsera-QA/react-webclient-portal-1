import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

// TODO: Refactor
function DateTimeRangeInputBase({ setDataFunction, fromFieldName, toFieldName, dataObject, setDataObject, disabled, className }) {
  return (
    <Row className={className}>
      <Col sm={12} md={6}>
        <DateTimeInput
          fieldName={fromFieldName}
          dataObject={dataObject}
          disabled={disabled}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
        />
      </Col>
      <Col sm={12} md={6}>
        <DateTimeInput
          fieldName={toFieldName}
          dataObject={dataObject}
          disabled={disabled}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
        />
      </Col>
    </Row>
  );
}

DateTimeRangeInputBase.propTypes = {
  fromFieldName: PropTypes.string,
  toFieldName: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default DateTimeRangeInputBase;
