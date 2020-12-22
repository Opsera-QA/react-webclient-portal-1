import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/SelectInputBase";

const classificationTypes = [
  {text: "Production", value: "production"},
  {text: "Non-Production", value: "non-production"}
];

function ToolClassificationSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={classificationTypes}
        valueField={"value"}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

ToolClassificationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ToolClassificationSelectInput.defaultProps = {
  fieldName: "classification",
};

export default ToolClassificationSelectInput;