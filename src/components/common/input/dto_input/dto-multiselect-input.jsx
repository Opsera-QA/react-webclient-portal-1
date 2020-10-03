import React, {useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'
import LoadingDialog from "../../status_notifications/loading";

function DtoMultiselectInput({ fieldName, dataObject, setDataObject, groupBy, disabled, selectOptions, valueField, textField, filter, placeholderText, setDataFunction}) {
  const [errorMessage, setErrorMessage] = useState("");
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
    return <LoadingDialog size={"sm"}/>
  }

  return (
    <div className="form-group custom-multiselect-input m-2">
      <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
      <Multiselect
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        groupBy={groupBy}
        value={[...dataObject.getData(fieldName)]}
        placeholder={placeholderText}
        disabled={disabled}
        onChange={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
      />
      <div className="invalid-feedback">
        <div>{errorMessage}</div>
      </div>
      <small className="form-text text-muted">
        <div>{field.formText}</div>
      </small>
    </div>
  );
}

DtoMultiselectInput.propTypes = {
  selectOptions: PropTypes.array,
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
  disabled: PropTypes.bool
};

DtoMultiselectInput.defaultProps = {
  filter: "contains",
  disabled: false
}

export default DtoMultiselectInput;