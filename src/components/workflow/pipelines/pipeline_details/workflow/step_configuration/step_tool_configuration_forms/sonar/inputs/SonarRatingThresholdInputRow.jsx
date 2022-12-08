import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

const THRESHOLD_LEVELS = [
  {text: "Security Rating", value: "security_rating"},
  {text: "Maintainability Rating", value: "sqale_rating"},
  {text: "Reliability Rating", value: "reliability_rating"},
];

const THRESHOLD_GRADES = [
  "A",
  "B",
  "C",
  "D",
  "E"
];

function SonarRatingThresholdInputRow(
  {
    index,
    disabled,
    updateThresholdGrade,
    updateThresholdLevel,
    deleteThresholdRow,
    grade,
    level
  }) {

  const getThresholdLevelInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={THRESHOLD_LEVELS}
        valueField={"value"}
        textField={"text"}
        value={level}
        disabled={disabled}
        placeholder={"Select A Threshold Level"}
        setDataFunction={(newValue) => updateThresholdLevel(newValue?.value)}
        noDataText={"SonarRatingThresholdInputRow"}
      />
    );
  };

  const getThresholdGradeInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={THRESHOLD_GRADES}
        valueField={"value"}
        textField={"text"}
        value={grade}
        disabled={disabled}
        placeholder={"Select A Threshold Grade"}
        setDataFunction={(newValue) => updateThresholdGrade(newValue)}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteThresholdRow(index)}>
          <span><IconBase className="danger-red" icon={faTimes} fixedWidth /></span>
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
            {getThresholdGradeInput()}            
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 ml-auto mr-auto delete-button"}>
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

SonarRatingThresholdInputRow.propTypes = {
  index: PropTypes.number,
  updateThresholdGrade: PropTypes.func,
  updateThresholdLevel: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  disabled: PropTypes.bool,
  grade: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  level: PropTypes.string,
};

export default SonarRatingThresholdInputRow;
