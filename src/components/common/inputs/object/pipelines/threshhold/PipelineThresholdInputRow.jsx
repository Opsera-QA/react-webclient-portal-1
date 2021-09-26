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
import StandaloneNumberPickerInputBase from "components/common/inputs/number/picker/base/StandaloneNumberPickerInputBase";

function PipelineThresholdInputRow(
  {
    disabledThresholdLevels,
    index,
    threshold,
    disabled,
    updateThresholdRow,
    deleteThresholdRow
  }) {
  const getThresholdLevelInput = (threshold) => {
    return (
      <DropdownList
        data={THRESHOLD_LEVELS}
        valueField={"value"}
        textField={"text"}
        value={threshold?.level}
        disabled={disabled || disabledThresholdLevels}
        filter={"contains"}
        placeholder={"Select A Group"}
        onChange={(newValue) => updateThresholdRow(threshold, "level", newValue?.value)}
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
        <Row>
          <Col sm={6} className={"pr-1"}>
            {getThresholdLevelInput(threshold, index)}
          </Col>
          <Col sm={6} className={"pl-1 pr-0"}>
            <StandaloneNumberPickerInputBase
              setDataFunction={(newValue) => updateThresholdRow(threshold, "level", newValue?.value)}
              disabled={disabled}
              placeholderText={"Select Count"}
              value={threshold?.count}
              minimum={1}
              // TODO: Should there be a maximum?
              // maximum={}
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
  threshold: PropTypes.object,
  disabledThresholdLevels: PropTypes.array,
  index: PropTypes.number,
  updateThresholdRow: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PipelineThresholdInputRow;