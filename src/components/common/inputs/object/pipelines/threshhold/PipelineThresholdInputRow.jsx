import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {THRESHOLD_LEVELS} from "components/common/list_of_values_input/pipelines/thresholds/PipelineThresholdLevelSelectInputBase";
import StandalonePositiveIntegerNumberTextInput
  from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";

function PipelineThresholdInputRow(
  {
    disabledThresholdLevels,
    index,
    disabled,
    updateThresholdRow,
    deleteThresholdRow,
    count,
    level
  }) {

  const getThresholdLevelInput = () => {
    return (
      <DropdownList
        data={THRESHOLD_LEVELS}
        valueField={"value"}
        textField={"text"}
        value={level}
        disabled={disabled || disabledThresholdLevels}
        filter={"contains"}
        placeholder={"Select A Group"}
        onChange={(newValue) => updateThresholdRow(index, "level", newValue?.value)}
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
              setDataFunction={(newValue) => updateThresholdRow(newValue)}
              disabled={disabled}
              value={count}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button"}>
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

PipelineThresholdInputRow.propTypes = {
  disabledThresholdLevels: PropTypes.array,
  index: PropTypes.number,
  updateThresholdRow: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  disabled: PropTypes.bool,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  level: PropTypes.string,
};

export default PipelineThresholdInputRow;