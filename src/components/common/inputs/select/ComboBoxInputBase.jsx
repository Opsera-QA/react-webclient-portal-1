import React, {useState} from "react";
import PropTypes from "prop-types";
import ComboBox from "react-widgets/lib/Combobox";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputLabel from "components/common/inputs/info_text/InputLabel";

function ComboBoxInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, disabled}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer className="custom-select-input my-2">
      <InputLabel field={field} />
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
      <InfoText field={field} />
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