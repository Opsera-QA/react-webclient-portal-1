import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneComboBoxInput from "components/common/inputs/combo_box/StandaloneComboBoxInput";

function ComboBoxInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, disabled}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    }
    else {
      validateAndSetData(newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className="custom-select-input my-2">
      <InputLabel field={field} model={dataObject} />
      <StandaloneComboBoxInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={dataObject?.getData(field.id)}
        busy={busy}
        placeholderText={placeholderText}
        setDataFunction={updateValue}
        disabled={disabled}
      />
      <InfoText
        field={field}
        model={dataObject}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

ComboBoxInputBase.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ComboBoxInputBase;