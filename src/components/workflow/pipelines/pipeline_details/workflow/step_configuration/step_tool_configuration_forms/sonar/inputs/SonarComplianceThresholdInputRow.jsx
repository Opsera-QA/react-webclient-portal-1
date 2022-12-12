import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandalonePositiveIntegerNumberTextInput
  from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

const THRESHOLD_LEVELS = [
  {text: "Duplicated lines (%)", value: "duplicated_lines_density"},  
  {text: "Coverage on New Code", value: "new_coverage"},  
  {text: "Security Hotspots Reviewed", value: "security_hotspots_reviewed"},
];

function SonarComplianceThresholdInputRow(
  {
    index,
    disabled,
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
        disabled={disabled}
        placeholder={"Select A Threshold Level"}
        setDataFunction={(newValue) => updateThresholdLevel(newValue?.value)}
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
            <StandalonePositiveIntegerNumberTextInput
              setDataFunction={(newValue) => updateThresholdCount(newValue)}
              disabled={disabled}
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

SonarComplianceThresholdInputRow.propTypes = {
  index: PropTypes.number,
  updateThresholdCount: PropTypes.func,
  updateThresholdLevel: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  disabled: PropTypes.bool,
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  level: PropTypes.string,
};

export default SonarComplianceThresholdInputRow;
