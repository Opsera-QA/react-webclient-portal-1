import React, {useState} from "react";
import PropTypes from "prop-types";
import ComboBox from "react-widgets/lib/Combobox";

function ComboBoxInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, disabled}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <div className="custom-select-input m-2">
      <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
      <ComboBox
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={dataObject.getData(field.id)}
        filter={"contains"}
        suggest={true}
        busy={busy}
        placeholder={placeholderText}
        onChange={data => setDataFunction ? setDataFunction(field.id, data) : validateAndSetData(field.id, data[valueField])}
        disabled={disabled}
      />
      <small className="form-text text-muted">
        <div>{field.formText}</div>
      </small>
    </div>
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