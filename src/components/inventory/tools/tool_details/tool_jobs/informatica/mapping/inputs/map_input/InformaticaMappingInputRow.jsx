import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import {matchesRegex} from "utils/helpers";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import regexDefinitions from "utils/regexDefinitions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/tools/informatica/iics_types/informaticaIntelligentCloudService.types";
import IconBase from "components/common/icons/IconBase";

function InformaticaMappingInputRow(
  {
    disabledMappings,
    index,
    disabled,
    duplicates,
    updateType,
    updateRule,
    deleteRow,
    type,
    rule
  }) {

  const validateAndSetData = (event) => {
    const value = event.target.value;

    if (value == null || value === "") {
      // updateRule(null);
      return;
    }

    const numericalFieldRegex = regexDefinitions.informaticaValidationRules.regex;

    if (!matchesRegex(numericalFieldRegex, value)) {
      // updateRule(value);
      return;
    }

    updateRule(value);
  };
  
  const getThresholdLevelInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_SELECT_OPTIONS}
        valueField={"value"}
        textField={"text"}
        value={type}
        disabled={disabled || disabledMappings}
        placeholder={"Select A Informatica Cloud Type"}
        setDataFunction={(newValue) => updateType(newValue?.value)}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteRow(index)}>
          <span><IconBase className={"danger-red"} icon={faTimes}/></span>
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
            <input
              disabled={disabled||duplicates}
              value={rule}
              className="form-control"
              onChange={(event) => validateAndSetData(event)}
              autoComplete="off"
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

InformaticaMappingInputRow.propTypes = {
  disabledMappings: PropTypes.array,
  index: PropTypes.number,
  updateType: PropTypes.func,
  updateRule: PropTypes.func,
  deleteRow: PropTypes.func,
  disabled: PropTypes.bool,
  duplicates: PropTypes.bool,
  rule: PropTypes.string,
  type: PropTypes.string,
};

export default InformaticaMappingInputRow;