import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES} from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";

function DataPointEvaluationTriggerValuesInput(
  {
    model,
    setModel,
    triggerFilter,
    disabled,
    updateRuleFunction,
  }) {
  const getInputs = () => {
    if (triggerFilter === DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE) {
      return (
        <>
          <Col sm={12} md={5}>
            <TextInputBase
              fieldName={"primary_trigger_value"}
              dataObject={model}
              setDataObject={setModel}
              setDataFunction={setDataFunction}
              disabled={disabled}
            />
          </Col>
          <Col sm={12} md={2} className={"w-100"}>
            <div className={"d-flex h-100"}>
              <div className={"mx-auto my-auto"}>and</div>
            </div>
          </Col>
          <Col sm={12} md={5}>
            <TextInputBase
              fieldName={"secondary_trigger_value"}
              dataObject={model}
              setDataObject={setModel}
              setDataFunction={setDataFunction}
              disabled={disabled}
            />
          </Col>
        </>
      );
    }

    return (
      <Col xs={12}>
        <TextInputBase
          fieldName={"primary_trigger_value"}
          dataObject={model}
          setDataObject={setModel}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
    );
  };

  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel.setData(fieldName, newValue);
    updateRuleFunction(newModel);
    return newModel;
  };

  if (hasStringValue(triggerFilter) !== true) {
    return null;
  }

  return (
    <Row>
      {getInputs()}
    </Row>
  );
}

DataPointEvaluationTriggerValuesInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  updateRuleFunction: PropTypes.func,
  disabled: PropTypes.bool,
  triggerFilter: PropTypes.string,
};

export default DataPointEvaluationTriggerValuesInput;