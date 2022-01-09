import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandalonePositiveIntegerNumberTextInput
  from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

export const THRESHOLD_LEVELS = [
  {text: "Priority 1", value: "1"},
  {text: "Priority 2", value: "2"},
  {text: "Priority 3", value: "3"},
  {text: "Priority 4", value: "4"},
  {text: "Priority 5", value: "5"},
];

function PmdScanThresholdInputRow(
  {
    disabledThresholdLevels,
    index,
    disabled,
    duplicates,
    updateThresholdCount,
    updateThresholdLevel,
    deleteThresholdRow,
    count,
    level
  }) {

  const getThresholdLevelInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={THRESHOLD_LEVELS}
        valueField={"value"}
        textField={"text"}
        value={level}
        disabled={disabled || disabledThresholdLevels}
        placeholder={"Select A Threshold Level"}
        setDataFunction={(newValue) => updateThresholdLevel(newValue?.value)}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteThresholdRow(index)}>
          <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
        </Button>
      );
    }
  };

  return (
    <div className="d-flex py-2" key={index}>
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col sm={6} className={"pl-0 pr-1"}>
            {getThresholdLevelInput()}
          </Col>
          <Col sm={6} className={"pl-1 pr-0"}>
            <StandalonePositiveIntegerNumberTextInput
              setDataFunction={(newValue) => updateThresholdCount(newValue)}
              disabled={disabled||duplicates}
              value={count}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 ml-auto mr-auto delete-button"}>
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

PmdScanThresholdInputRow.propTypes = {
  disabledThresholdLevels: PropTypes.array,
  index: PropTypes.number,
  updateThresholdCount: PropTypes.func,
  updateThresholdLevel: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  duplicates: PropTypes.bool,
  disabled: PropTypes.bool,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  level: PropTypes.string,
};

export default PmdScanThresholdInputRow;