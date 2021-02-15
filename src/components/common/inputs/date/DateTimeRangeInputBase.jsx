import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

function DateTimeRangeInputBase({ setDataFunction, fromFieldName, toFieldName, dataObject, setDataObject, disabled, className }) {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Row className={className}>
      <Col sm={12} md={6}>
        <DateTimeInput
          fieldName={fromFieldName}
          dataObject={dataObject}
          maxDate={dataObject.getData(toFieldName)}
          disabled={disabled}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
        />
      </Col>
      <Col sm={12} md={6}>
        <DateTimeInput
          fieldName={toFieldName}
          dataObject={dataObject}
          minDate={dataObject.getData(fromFieldName)}
          disabled={disabled}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
        />
      </Col>
      <small className="invalid-feedback">
        <div>{errorMessage}</div>
      </small>
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
