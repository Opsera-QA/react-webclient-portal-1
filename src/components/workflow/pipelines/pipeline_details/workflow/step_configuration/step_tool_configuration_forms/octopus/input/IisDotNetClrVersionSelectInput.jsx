import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const versions = [
  {name: "v4.0", value: "v4.0"},
  {name: "v2.0", value: "v2.0"},
  {name: "No Managed Code", value: "no_managed_code"},
];

function IisDotNetClrVersionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={versions}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select .Net Clr Version"}
        disabled={disabled}
      />
    </div>
  );
}

IisDotNetClrVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

IisDotNetClrVersionSelectInput.defaultProps = {
  fieldName: "dotNetClrVersion",
  valueField: "value",
  textField: "name"
};

export default IisDotNetClrVersionSelectInput;