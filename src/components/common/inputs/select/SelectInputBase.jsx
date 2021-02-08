import React, {useState} from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag, faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function SelectInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, disabled, showClearValueButton}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (data) => {
    if (setDataFunction) {
      setDataFunction(field.id, data);
    }
    else {
      validateAndSetData(field.id, data[valueField])
    }
  };

  const clearValue = () => {
    if (setDataFunction) {
      setDataFunction(field.id, "");
    }
    else {
      validateAndSetData(field.id, "")
    }
  };

  // TODO: We really need to pass in two functions if clearing out data on a complex function,
  //  one for setting and one for clearing.
  //  For now, I'm going to disable the clear button if you pass in setDataFunction
  const getClearDataIcon = () => {
    if (dataObject.getData(field.id) !== "" && !disabled && setDataFunction == null && showClearValueButton) {
      return (
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearValue()} className="mx-1 mb-1 badge badge-light tag-badge pointer danger-red">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Clear Value
          </span>
        </TooltipWrapper>
      );
    }
  };

  return (
    <div className="custom-select-input m-2">
      <div className="d-flex justify-content-between w-100">
        <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
        {getClearDataIcon()}
      </div>
      <DropdownList
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={dataObject.getData(field.id)}
        filter={"contains"}
        busy={busy}
        placeholder={placeholderText}
        onChange={(data) => updateValue(data)}
        disabled={disabled}
      />
      <small className="form-text text-muted">
        <div>{field.formText}</div>
      </small>
    </div>
  );
}

SelectInputBase.propTypes = {
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
  disabled: PropTypes.bool,
  allowValueClear: PropTypes.bool,
};

SelectInputBase.defaultProps = {
  showClearValueButton: true
}

export default SelectInputBase;