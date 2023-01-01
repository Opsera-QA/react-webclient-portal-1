import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

// TODO: Refactor
export default function DateTimeRangeInputBase(
  {
    setDataFunction,
    fromFieldName,
    toFieldName,
    model,
    setModel,
    disabled,
    className,
    stacked,
    defaultToNull,
    showTime,
    addTimezoneDifference,
  }) {
  return (
    <Row className={className}>
      <Col sm={12} md={stacked !== true ? 6 : undefined}>
        <DateTimeInput
          fieldName={fromFieldName}
          dataObject={model}
          disabled={disabled}
          setDataObject={setModel}
          setDataFunction={setDataFunction}
          defaultToNull={defaultToNull}
          showTime={showTime}
          addTimezoneDifference={addTimezoneDifference}
        />
      </Col>
      <Col sm={12} md={stacked !== true ? 6 : undefined}>
        <DateTimeInput
          className={stacked === true ? "mb-2" : undefined}
          fieldName={toFieldName}
          dataObject={model}
          disabled={disabled}
          setDataObject={setModel}
          setDataFunction={setDataFunction}
          defaultToNull={defaultToNull}
          showTime={showTime}
          addTimezoneDifference={addTimezoneDifference}
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
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  stacked: PropTypes.bool,
  defaultToNull: PropTypes.bool,
  showTime: PropTypes.bool,
  addTimezoneDifference: PropTypes.bool,
};
