import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

// TODO: Refactor
export default function DateTimeRangeInputBase(
  {
    setDataFunction,
    clearDataFunction,
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
          className={stacked === true ? "" : undefined}
          inputLabelClassName={stacked === true ? "bold" : undefined}
          fieldName={fromFieldName}
          dataObject={model}
          disabled={disabled}
          setDataObject={setModel}
          setDataFunction={setDataFunction}
          defaultToNull={defaultToNull}
          showTime={showTime}
          addTimezoneDifference={addTimezoneDifference}
          clearDataFunction={clearDataFunction}
        />
      </Col>
      <Col sm={12} md={stacked !== true ? 6 : undefined}>
        <DateTimeInput
          className={stacked === true ? "mb-2" : undefined}
          inputLabelClassName={stacked === true ? "bold" : undefined}
          fieldName={toFieldName}
          dataObject={model}
          disabled={disabled}
          setDataObject={setModel}
          setDataFunction={setDataFunction}
          defaultToNull={defaultToNull}
          showTime={showTime}
          addTimezoneDifference={addTimezoneDifference}
          clearDataFunction={clearDataFunction}
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
  clearDataFunction: PropTypes.func,
  stacked: PropTypes.bool,
  defaultToNull: PropTypes.bool,
  showTime: PropTypes.bool,
  addTimezoneDifference: PropTypes.bool,
};
