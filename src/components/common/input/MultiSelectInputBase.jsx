import React, {useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'

function MultiSelectInputBase({ fieldName, dataObject, setDataObject, groupBy, disabled, selectOptions, valueField, textField, placeholderText, setDataFunction, busy}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    let parsedValues = parseValues(valueArray);
    newDataObject.setData(fieldName, parsedValues);
    setDataObject({...newDataObject});
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map(value => {
        parsedValues.push(value[valueField]);
      });
    }

    return parsedValues;
  };

  if (field == null) {
    return <></>
  }

  return (
    <div className="custom-multiselect-input m-2">
      <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
      <Multiselect
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        busy={busy}
        filter="contains"
        groupBy={groupBy}
        value={[...dataObject.getData(fieldName)]}
        placeholder={placeholderText}
        disabled={disabled}
        onChange={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
      />
      <small className="form-text text-muted">
        <div>{field.formText}</div>
      </small>
    </div>
  );
}

MultiSelectInputBase.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  maxNumber: PropTypes.number,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool
};

export default MultiSelectInputBase;