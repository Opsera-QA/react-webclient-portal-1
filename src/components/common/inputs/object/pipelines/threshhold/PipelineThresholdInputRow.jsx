import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {THRESHOLD_LEVELS} from "components/common/list_of_values_input/pipelines/thresholds/PipelineThresholdLevelSelectInputBase";
import StandalonePositiveIntegerNumberTextInput
  from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function PipelineThresholdInputRow(
  {
    disabledThresholdLevels,
    index,
    disabled,
    updateThresholdCount,
    updateThresholdLevel,
    deleteThresholdRow,
    count,
    level,
    thresholds,
  }) {

  const getThresholdLevelInput = () => {

    const tmpThresholds = DataParsingHelper.parseArray(thresholds, []);

    const thresholdLevels = tmpThresholds.length > 0 ? tmpThresholds : THRESHOLD_LEVELS;

    return (
      <StandaloneSelectInput
        selectOptions={thresholdLevels.filter(level => !disabledThresholdLevels.includes(level.value))}
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
          <span><IconBase className="danger-red" icon={faTimes} fixedWidth/></span>
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

PipelineThresholdInputRow.propTypes = {
  disabledThresholdLevels: PropTypes.array,
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
  thresholds: PropTypes.array,
};

export default PipelineThresholdInputRow;
