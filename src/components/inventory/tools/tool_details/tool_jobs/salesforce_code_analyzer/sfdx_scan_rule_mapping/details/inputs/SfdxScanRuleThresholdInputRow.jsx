import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandalonePositiveIntegerNumberTextInput from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {truncateString} from "../../../../../../../../common/helpers/string-helpers";


function SfdxScanRuleThresholdInputRow({
  disabledThresholdLevels,
  index,
  disabled,
  duplicates,
  updateThresholdCount,
  updateThresholdLevel,
  deleteThresholdRow,
  thresholdKeys,
  count,
  description,
  engine,
  loading,
  level,
}) {
  const getThresholdLevelInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={thresholdKeys ? thresholdKeys : []}
        valueField={"name"}
        textField={"name"}
        value={level}
        disabled={disabled || disabledThresholdLevels}
        placeholder={"Select A Threshold Level"}
        setDataFunction={(newValue) => updateThresholdLevel(newValue)}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button
          variant="link"
          onClick={() => deleteThresholdRow(index)}
        >
          <span>
            <IconBase
              className={"danger-red"}
              icon={faTimes}
            />
          </span>
        </Button>
      );
    }
  };

  return (
    <div
      className="d-flex py-2"
      key={index}
    >
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col
            sm={6}
            className={"pl-0 pr-1"}
          >
            {getThresholdLevelInput()}
          </Col>
          <Col
            sm={2}
            className={"pl-1 pr-0"}
          >
            <StandalonePositiveIntegerNumberTextInput
              setDataFunction={(newValue) => updateThresholdCount(newValue)}
              disabled={disabled || duplicates}
              value={count}
            />
          </Col>
          <Col
            sm={2}
            className={"pl-3 pr-0"}
          >
            <div className="w-10 d-flex">
              <span>{engine}</span>
            </div>
          </Col>
          <Col
            sm={2}
            className={"pl-1 pr-0"}
          >
            <div className="w-10 d-flex text-overflow: ellipsis;">
              <TooltipWrapper innerText={description}>
                <span>{truncateString(description, 25, true)}</span>
              </TooltipWrapper>
            </div>
          </Col>
        </Row>
      </Col>
      <Col
        sm={1}
        className={"px-0 ml-auto mr-auto delete-button"}
      >
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

SfdxScanRuleThresholdInputRow.propTypes = {
  disabledThresholdLevels: PropTypes.array,
  index: PropTypes.number,
  thresholdKeys: PropTypes.array,
  updateThresholdCount: PropTypes.func,
  updateThresholdLevel: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  duplicates: PropTypes.bool,
  disabled: PropTypes.bool,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  engine: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};

export default SfdxScanRuleThresholdInputRow;
