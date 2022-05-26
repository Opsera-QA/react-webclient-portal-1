import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandalonePositiveIntegerNumberTextInput from "components/common/inputs/text/number/integer/StandalonePositiveIntegerNumberTextInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

function SfdxScanPriorityThresholdInputRow({
  disabledThresholdLevels,
  index,
  disabled,
  duplicates,
  loading,
  updateThresholdCount,
  updateThresholdLevel,
  deleteThresholdRow,
  thresholdKeys,
  count,
  level,
}) {
  const getThresholdLevelInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={thresholdKeys ? thresholdKeys : []}
        valueField={""}
        textField={""}
        value={level}
        disabled={disabled || disabledThresholdLevels}
        placeholder={"Select A Priority Level"}
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
            sm={6}
            className={"pl-1 pr-0"}
          >
            <StandalonePositiveIntegerNumberTextInput
              setDataFunction={(newValue) => updateThresholdCount(newValue)}
              disabled={disabled || duplicates}
              value={count}
            />
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

SfdxScanPriorityThresholdInputRow.propTypes = {
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
  loading: PropTypes.bool,
};

export default SfdxScanPriorityThresholdInputRow;
