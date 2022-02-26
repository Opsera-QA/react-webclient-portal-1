import React  from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";

function StandaloneBooleanToggleInput({ fieldId, checkedValue, fieldLabel, setDataFunction, disabled }) {
  return (
    <InputContainer>
      <Form.Check
        type={"switch"}
        className={"toggle-alignment"}
        id={fieldId}
        checked={checkedValue}
        disabled={disabled}
        label={fieldLabel}
        onChange={() => {
          setDataFunction(!checkedValue);
        }}
      />      
    </InputContainer>    
  );
}

StandaloneBooleanToggleInput.propTypes = {
  fieldId: PropTypes.string,
  fieldLabel: PropTypes.string,
  checkedValue: PropTypes.bool,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default StandaloneBooleanToggleInput;
