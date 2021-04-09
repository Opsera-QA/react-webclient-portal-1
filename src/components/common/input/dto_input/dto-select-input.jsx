import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

// TODO: Refactor any instances into multiple components (selectInput, multiselectInput). DON'T STORE OPTIONS INSIDE EDITOR PANELS, MAKE REUSABLE COMPONENTS
function DtoSelectInput({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, filter, placeholderText, setDataFunction, allowCreate, setSelectOptions, valueFormatter, busy, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const handleCreate = (newValue) => {
    let currentOptions = [...selectOptions];
    currentOptions.push(newValue);
    setSelectOptions(currentOptions);
    validateAndSetData(fieldName, newValue);
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className="custom-select-input my-2">
      <InputLabel field={field} />
      <DropdownList
        allowCreate={allowCreate}
        onCreate={name => handleCreate(name)}
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        groupBy={groupBy}
        value={dataObject.getData(fieldName)}
        valueComponent={valueFormatter}
        busy={busy}
        placeholder={placeholderText}
        onChange={data => setDataFunction ? setDataFunction(fieldName, data) : validateAndSetData(fieldName, data[valueField])}
        disabled={disabled}
      />
      <InfoText field={field} errorMessage={errorMessage} />
    </InputContainer>
  );
}

DtoSelectInput.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  filter: PropTypes.string,
  value: PropTypes.func,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.string,
  setSelectOptions: PropTypes.func,
  valueFormatter: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool
};

DtoSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One"
};

export default DtoSelectInput;