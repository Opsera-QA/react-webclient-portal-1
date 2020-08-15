import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'

function DtoMultiselectInput({ fieldName, dataObject, setDataObject, groupBy, disabled, selectOptions, valueField, textField, filter, placeholderText, setDataFunction, allowCreate}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadExtraOptions();
  }, [options]);

  const loadExtraOptions = () => {
    console.log("loadExtraOptions");
    let values = dataObject.getData(fieldName);
    let currentOptions = selectOptions;
    if (values && values.length > 0) {
      values.map(item => {
        if (currentOptions.find(option => option === item) == null) {
          currentOptions.push(item);
        }
      });
      setOptions(currentOptions);
    }
  }

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const handleCreate = (newValue) => {
    let currentOptions = [...options];
    let currentValues = dataObject.getData(fieldName);
    currentValues.push(newValue);
    currentOptions.push(newValue);
    setOptions(currentOptions);
    validateAndSetData(fieldName, currentValues);
  }

  return (
    field &&
        <>
          <div className="form-group custom-multiselect-input m-2">
            <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null } </span></label>
            <Multiselect
              data={[...options]}
              valueField={valueField}
              textField={textField}
              filter={filter}
              allowCreate={allowCreate}
              groupBy={groupBy}
              onCreate={value => handleCreate(value)}
              value={[...dataObject.getData(fieldName)]}
              placeholder={placeholderText}
              disabled={disabled}
              onChange={e => setDataFunction ? setDataFunction(field.id, e) : validateAndSetData(field.id, e)}
            />
            <div className="invalid-feedback">
              <div>{errorMessage}</div>
            </div>
            <small className="form-text text-muted">
              <div>{field.formText}</div>
            </small> 
          </div>
        </>
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
  allowCreate: PropTypes.string,
  disabled: PropTypes.bool
};

DtoMultiselectInput.defaultProps = {
  filter: "contains",
  allowCreate: "onFilter",
  disabled: false
}

export default DtoMultiselectInput;